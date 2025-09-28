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
      image: "/images/haus-1/house02-01.jpg", 
      number: "1/4"
    },
    {
      id: 2,
      name: "HAUS M",
      location: "MÜNCHEN, DEUTSCHLAND", 
      image: "/images/haus-2/01.jpg",
      number: "2/4"
    },
    {
      id: 3,
      name: "HAUS G",
      location: "GIESSEN, DEUTSCHLAND",
      image: "/images/haus-1/house02-02.jpg", 
      number: "3/4"
    },
    {
      id: 4,
      name: "HAUS M",
      location: "MÜNCHEN, DEUTSCHLAND", 
      image: "/images/haus-2/house01-02.jpg",
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
        <meta name="description" content="Stein Architekten - Contemporary Architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Container principal */}
      <div className="homepage">
        {/* Header com logo e navegação */}
        <header className="header">
          <h1 className="logo">STEIN ARCHITEKTEN</h1>
          <nav className="nav">
            <a href="#contact" className="nav-link">CONTACT</a>
            <a href="#about" className="nav-link">ABOUT</a>
          </nav>
        </header>

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

          {/* Informações do projeto */}
          <div className="project-info">
            <span className="project-number">
              {projects[currentProject].number}
            </span>
            <h2 className="project-title">
              {projects[currentProject].name}
              <span className="project-location">
                , {projects[currentProject].location}
              </span>
            </h2>
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
            font-family: 'Arial', sans-serif;
            color: white;
          }

          .header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
          }

          .logo {
            font-size: 1.5rem;
            font-weight: 300;
            letter-spacing: 2px;
            margin: 0;
          }

          .nav {
            display: flex;
            gap: 2rem;
          }

          .nav-link {
            color: white;
            text-decoration: none;
            font-size: 0.9rem;
            letter-spacing: 1px;
            transition: opacity 0.3s ease;
          }

          .nav-link:hover {
            opacity: 0.7;
          }

          .main-content {
            position: relative;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
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
            background: rgba(0, 0, 0, 0.3);
            z-index: 2;
          }

          .project-info {
            position: relative;
            z-index: 5;
            text-align: center;
            max-width: 600px;
            padding: 2rem;
          }

          .project-number {
            display: block;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            opacity: 0.8;
          }

          .project-title {
            font-size: 3rem;
            font-weight: 300;
            margin: 0;
            letter-spacing: 2px;
            line-height: 1.2;
          }

          .project-location {
            display: block;
            font-size: 1.2rem;
            margin-top: 0.5rem;
            opacity: 0.9;
          }

          .indicators {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 1rem;
            z-index: 5;
          }

          .indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .indicator:hover,
          .indicator.active {
            background: white;
          }

          /* Responsividade */
          @media (max-width: 768px) {
            .header {
              padding: 1rem;
            }
            
            .logo {
              font-size: 1.2rem;
            }
            
            .nav {
              gap: 1rem;
            }
            
            .project-title {
              font-size: 2rem;
            }
            
            .project-info {
              padding: 1rem;
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