import Image from "next/image";
import techsImage from "../../public/images/techs.svg"
import Head from "next/head";
import styles from "../styles/home.module.scss";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText }  from "prismic-dom";



type Content = {
  title: string,
  subtitle: string,
  linkAction: string[],
  mobile_title: string,
  mobile_content: string,
  mobile_banner: string,
  web_title: string,
  web_content: string,
  web_banner: string,
}

interface contentProps{
  content: Content;
}









export default function Home({ content }: contentProps) {
  return (
  <>
  <Head>
      <title>
        Apoixonado por Tecnologia - Sujeito Programador
      </title>
  </Head>

  <main className={styles.container}>
    <div className={styles.containerHeader}>
      <section className={styles.CtaText}>
        <h1>Levando você ao próximo nível!</h1>
          <span>Uma plataforma com cursos que vão do zero até o profissional na pratica, direto ao ponto aplicando o que usamos no mercado de trabalho. 👊</span>
      
            <a href="www.youtube.com/sujeitoprogramador">
              <button>Começar Agora</button>
            </a>


      </section>
        <img 
          src="/images/banner-conteudos.png" 
          alt="conteudos sujeito programador" />
    </div>


    <hr className={styles.divisor}/>

    <div className={styles.sectionContent}>
      <section>
        <h2>Aprenda criar aplicativos para android e ios.</h2>
        <span>Você vai descobrir o jeito mais moderno de desenvolver apps nativos para iOS e Android, construindo aplicativos do zero até aplicativos.</span>
      </section>

      <img src="/images/financasApp.png" alt="Exemplo de App" />
    </div>



      <hr className={styles.divisor}/>

      <div className={styles.sectionContent}>
        <img src="/images/webDev.png" alt="Exemplo de App" />
        <section>
          <h2>Aprenda criar sistemas web.</h2>
          <span>Criar sistemas web, sites usando as tecnologias mais modernas e requisitadas pelo mercado.</span>
        </section>
      </div>
        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt="Imagem das tecnologias usadas no curso"/>
          <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
          <span className={styles.nextLevelSpan}>E você vai perder a chance de evoluir de uma vez por todas?</span>

          <a><button>ACESSAR TURMA</button></a>
        </div>



        
    
  </main>
  </>
)}



export const getStaticProps: GetStaticProps = async () => {
      const prismic = getPrismicClient();

      const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'home')
      ])

      console.log(response.results[0].data)

      const {
        title, subtitle, link_action, 
        mobile_title, mobile_content, mobile_banner,
        web_title, web_content, web_banner
      } = response.results[0].data;

      const content = {
        title: RichText.asText(title),
        subtitle: RichText.asText(subtitle),
        linkAction: link_action.url,
        mobile_title: RichText.asText(mobile_title),
        mobile_content: RichText.asText(mobile_content),
        mobile_banner: mobile_banner.url,
        web_title: RichText.asText(web_title),
        web_content: RichText.asText(web_content),
        web_banner: web_banner.url,
      }


  return{
    props: {
        content,
    },
    revalidate: 60 * 2// Gerado a cada 2 min
  }
}