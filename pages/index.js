// pages/index.js - Página principal do Next.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  // Estado para controlar qual projeto está sendo exibido
  const [currentProject, setCurrentProject] = useState(0);
  
  // Array com os dados dos projetos
  const projects = [
    {
      id: 1,
      name: "HAUS G",
      location: "GIESSEN, DEUTSCHLAND",
      image: "/images/haus-01/01.jpg",
      number: "1/4"
    },
    {
      id: 2,
      name: "HAUS M",
      location: "MÜNCHEN, DEUTSCHLAND", 
      image: "/images/haus-02/house02-01.jpg",
      number: "2/4"
    },
		    {
      id: 1,
      name: "HAUS G",
      location: "GIESSEN, DEUTSCHLAND",
      image: "/images/haus-01/house01-02.jpg",
      number: "3/4"
    },
    {
      id: 2,
      name: "HAUS M",
      location: "MÜNCHEN, DEUTSCHLAND", 
      image: "/images/haus-02/house02-01.jpg",
      number: "4/4"
    },
  ];

  // useEffect para criar um slideshow automático (conceito de ciclo de vida)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 5000); // Muda a cada 5 segundos

    // Cleanup function - importante no React para evitar memory leaks
    return () => clearInterval(interval);
  }, [projects.length]);

  // Função para navegar entre projetos
  const goToProject = (index) => {
    setCurrentProject(index);
  };

  return (
    <>
      {/* Head do Next.js para metadados da página */}
      <Head>
        <title>Stein Architekten</title>
        <meta name="description" content="Stein Architekten - by Robert Stein" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* Container principal */}
      <div className="homepage">
        {/* Header com logo */}
        <header className="header">
          <h1 className="logo">STEIN ARCHITEKTEN</h1>
        </header>

        {/* Navegação centralizada */}
        <nav className="center-nav">
          <a href="#contact" className="nav-link">CONTACT</a>
          <a href="#about" className="nav-link">ABOUT</a>
        </nav>

        {/* Seção principal com imagem e informações do projeto */}
        <main className="main-content">
          {/* Container da imagem de fundo */}
          <div className="image-container">
            <Image
              src={projects[currentProject].image}
              alt={projects[currentProject].name}
              fill
              priority
              className="background-image"
              style={{ objectFit: 'cover' }}
            />
            
            {/* Overlay escuro para melhor legibilidade do texto */}
            <div className="overlay" />
          </div>

          {/* Informações do projeto - alinhadas à esquerda */}
          <div className="project-info">
            <span className="project-number">
              {projects[currentProject].number}
            </span>
            <h2 className="project-title">
              {projects[currentProject].name}
            </h2>
            <span className="project-location">
              {projects[currentProject].location}
            </span>
          </div>

          {/* Indicadores de navegação */}
          <div className="indicators">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentProject ? 'active' : ''}`}
                onClick={() => goToProject(index)}
                aria-label={`Ver projeto ${index + 1}`}
              />
            ))}
          </div>
        </main>

        {/* Estilos CSS incorporados (em produção, use arquivos CSS separados) */}
        <style jsx>{`
          .homepage {
            height: 100vh;
            position: relative;
            overflow: hidden;
            font-family: 'Archivo', sans-serif;
            color: white;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr; /* 4 colunas */
          }

          .header {
            position: absolute;
            top: 2rem;
            left: 2rem;
            z-index: 10;
          }

          .logo {
            font-size: 1.2rem;
            font-weight: 400;
            letter-spacing: 1px;
            margin: 0;
            color: white;
          }

          .center-nav {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            gap: 3rem;
            z-index: 10;
          }

          .nav-link {
            color: white;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 400;
            letter-spacing: 1px;
            transition: opacity 0.3s ease;
          }

          .nav-link:hover {
            opacity: 0.7;
          }

          .main-content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }

          .image-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
          }

          .background-image {
            transition: opacity 0.8s ease-in-out;
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            z-index: 2;
          }

          .project-info {
            position: relative;
            z-index: 5;
            text-align: left;
            padding-left: 4rem;
            max-width: 400px;
          }

          .project-number {
            display: block;
            font-size: 0.8rem;
            font-weight: 300;
            margin-bottom: 0.5rem;
            opacity: 0.9;
            letter-spacing: 1px;
          }

          .project-title {
            font-size: 2.5rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
            letter-spacing: 1px;
            line-height: 1.1;
          }

          .project-location {
            display: block;
            font-size: 0.9rem;
            font-weight: 300;
            opacity: 0.9;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .indicators {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 0.8rem;
            z-index: 5;
          }

          .indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid white;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0.6;
          }

          .indicator:hover,
          .indicator.active {
            background: white;
            opacity: 1;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .homepage {
              grid-template-columns: 1fr; /* Uma coluna no mobile */
            }
            
            .header {
              top: 1rem;
              left: 1rem;
            }
            
            .logo {
              font-size: 1rem;
            }
            
            .center-nav {
              top: 1rem;
              right: 1rem;
              left: auto;
              transform: none;
              gap: 1.5rem;
            }
            
            .project-title {
              font-size: 1.8rem;
            }
            
            .project-info {
              padding-left: 1rem;
              max-width: 300px;
            }
          }
        `}</style>
      </div>
    </>
  );
}

// Esta função roda no servidor antes da página ser enviada ao cliente
// Útil para buscar dados de APIs ou bancos de dados
export async function getStaticProps() {
  // Aqui você poderia buscar dados de projetos de uma API
  // Por exemplo:
  // const projects = await fetch('https://api.exemplo.com/projects').then(res => res.json());
  
  return {
    props: {
      // projects, // Passaria os dados como props para o componente
    },
    // Revalidate a cada 60 segundos (ISR - Incremental Static Regeneration)
    revalidate: 60,
  };
}