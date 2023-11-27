import Image from "next/image";
import techsImage from "../../public/images/techs.svg"
import Head from "next/head";
import styles from "../styles/home.module.scss";

export default function Home() {
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
      
            <a>
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