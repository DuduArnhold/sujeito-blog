import styles from "./styles.module.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {useState, } from "react";


import { FiChevronLeft, FiChevronsLeft, FiChevronsRight, FiChevronRight} from "react-icons/fi";
import { GetStaticProps } from "next";


import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";


type Post = {
    slug: string;
    title: string;
    cover: string;
    description: string;
    updateAt: string;
}

interface PostsProps{
    posts: Post[]
    page: string
    totalPage: string
}

export default function Posts({ posts: postsBlog, page, totalPage}: PostsProps){

    const [currentPage, setCurrentPage] = useState(Number(page));

    const [posts, setPosts] = useState(postsBlog || []);

    // Buscar novos posts

    async function reqPost(pageNumber: Number){
        const prismic  = getPrismicClient();

        const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'post')
        ],{
            orderings: '[document.last_publication_date desc]'  ,/// ordenar pelo mais recente
            fetch: ['post.title', 'post.description', 'post.cover'],
            pageSize: 3,
            page: String(pageNumber)
        })
        return response;
    }



    async function navigatePage(pageNumber: Number){
        const response = await reqPost(pageNumber);

        if(response.results.length === 0){
            return;
        }

        const getPosts = response.results.map( post => {
            return{
                slug: post.uid,
                title: RichText.asText(post.data.title),
                description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
                cover: post.data.cover.url,
                updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })

            }
        })
        setCurrentPage(Number(pageNumber));
        setPosts(getPosts);


    }

    return(
        <>
            <Head>
                <title>Blog | Sujeito Programador</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>

                    {posts.map( post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                        <Image 
                        src={post.cover} 
                        alt={post.title}
                        width={720}
                        height={410}
                        quality={100}
                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUbaivBwADmwGlSXR9uQAAAABJRU5ErkJggg=='
                        placeholder="blur"
                        />

                        <strong>
                            {post.title}
                        </strong>

                        <time>
                            {post.updateAt}
                        </time>

                        <p>{post.description}</p>
                        </Link>
                    ))}

                        <div className={styles.buttonNavigate}>
                            {
                                    Number(currentPage) >= 2 && (
                                        <div>
                                        <button onClick={ () => navigatePage(1)}>
                                            <FiChevronsLeft size={25} color="#FFF" />
                                        </button>
                                        <button onClick={ () => navigatePage(Number(currentPage) - 1)}>
                                            <FiChevronLeft size={25} color="#FFF" />
                                        </button>
                                    </div>
                                    )
                            }


                            {
                                Number(currentPage) < Number(totalPage) && (
                                    <div>
                                    <button onClick={ () => navigatePage(Number(currentPage) + 1)}>
                                        <FiChevronRight size={25} color="#FFF" />
                                    </button>
                                    <button onClick={ () => navigatePage(Number(totalPage))}>
                                        <FiChevronsRight size={25} color="#FFF" />
                                    </button>
                                    
                                </div>
                                )
                            }

                        </div>


                </div>





            </main>
        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {

    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at("document.type", "post")
    ], {
        orderings: '[document.last_publication_date desc]'  ,/// ordenar pelo mais recente
        fetch: ['post.title', 'post.description', 'post.cover'],
        pageSize: 3,
    })

  //  console.log(JSON.stringify(response, null, 2))

        const posts = response.results.map( post => {
            return{
                slug: post.uid,
                title: RichText.asText(post.data.title),
                description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
                cover: post.data.cover.url,
                updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })

            }
        })

    return{
        props:{
            posts,
            page: response.page,
            totalPage: response.total_pages,
        },
        revalidate: 60 * 30 //atualiza a cada 30min
    }
}

