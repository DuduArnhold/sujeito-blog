
import { GetStaticProps } from "next";
import styles from "../sobre/style.module.scss";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";

import { RichText } from "prismic-dom";
import Prismic from "@prismicio/client";

import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';




type Content = {
        tittle: string;
        description: string;
        banner: string;
        facebook: string;
        instagram: string;
        youtube: string;
        linkedin: string;
}

interface ContentProps{
    content: Content,
}

export default function Sobre({ content }: ContentProps){
    return(
        <>
        <Head>
            <title>
                Sobre || Sujeito Programador
            </title>
        </Head>

        <main className={styles.container}>
            <div className={styles.containerHeader}>
            <section className={styles.CtaText}>
                <h1>{content.tittle}</h1>
                <p>{content.description}</p>

                <a href={content.youtube}>
                    <FaYoutube
                        size={40}
                    />
                </a>
                
                <a href={content.instagram}>
                    <FaInstagram
                        size={40}
                    />
                </a>
                
                <a href={content.facebook}>
                    <FaFacebook
                        size={40}
                    />
                </a>
                
                <a href={content.linkedin}>
                    <FaLinkedin
                        size={40}
                    />
                </a>
            </section>

                <img src={ content.banner } alt={ content.tittle  } />

            </div>
        </main>
        </>
    )
}











export const getStaticProps: GetStaticProps = async () => {

    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at("document.type", 'abouth')
    ])


    const {
        tittle,
        description,
        banner,
        facebook,
        instagram,
        youtube,
        linkedin,
    } = response.results[0].data;

    const content = {
        tittle: RichText.asText(tittle),
        description: RichText.asText(description),
        banner: banner.url,
        facebook: facebook.url,
        instagram: instagram.url,
        youtube: youtube.url,
        linkedin: linkedin.url,

        }
   
   
   
    return{
        props: {
            content,
        }

    }
}