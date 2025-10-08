import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ProjectPage() {
	const router = useRouter();
	const { slug } = router.query;
	const [isAboutProjectOpen, setIsAboutProjectOpen] = useState(false);

	// Dados do projeto (em produção, viriam de uma API ou CMS)
	const projectData = {
		'haus-g': {
			name: 'HAUS G',
			location: 'GIESSEN, DEUTSCHLAND',
			images: [
				'/images/haus-01/01.jpg',
				'/images/haus-01/02.jpg',
				'/images/haus-01/03.jpg',
				'/images/haus-01/04.jpg',
				'/images/haus-01/05.jpg',
				'/images/haus-01/06.jpg',
				'/images/haus-01/07.jpg',
				'/images/haus-01/08.jpg',
				'/images/haus-01/09.jpg',
				'/images/haus-01/10.jpg',
				'/images/haus-01/11.jpg',
				'/images/haus-01/12.jpg',
				'/images/haus-01/13.jpg',
				'/images/haus-01/14.jpg',
				'/images/haus-01/15.jpg',
				'/images/haus-01/16.jpg',
				'/images/haus-01/17.jpg',
				'/images/haus-01/18.jpg',
				'/images/haus-01/19.jpg',
				'/images/haus-01/20.jpg',
			],
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},
		'haus-m': {
			name: 'HAUS M',
			location: 'MÜNCHEN, DEUTSCHLAND',
			images: [
				'/images/haus-02/01.jpg',
				'/images/haus-02/02.jpg',
				'/images/haus-02/03.jpg',
				'/images/haus-02/04.jpg',
				'/images/haus-02/05.jpg',
				'/images/haus-02/06.jpg',
				'/images/haus-02/07.jpg',
				'/images/haus-02/08.jpg',
				'/images/haus-02/09.jpg',
				'/images/haus-02/10.jpg',
				'/images/haus-02/11.jpg',
				'/images/haus-02/12.jpg',
				'/images/haus-02/13.jpg',
				'/images/haus-02/14.jpg',
			],
			description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
		}
	};

	const project = projectData[slug] || projectData['haus-g'];

	return (
		<>
			<Head>
				<title>{project.name} - Stein Architekten</title>
				<meta name="description" content={`${project.name} - ${project.location}`} />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600&display=swap" rel="stylesheet" />
			</Head>

			<div className="project-page">
				<header className="project-header">
					<Link href="/" className="logo">
						STEIN ARCHITEKTEN
					</Link>

					<button 
						className="close-project"
						onClick={() => router.push('/')}
						aria-label="Close project"
					>
						×
					</button>
				</header>

				<main className="project-gallery">
					{project.images.map((image, index) => (
						<div key={index} className="gallery-item">
							<Image
								src={image}
								alt={`${project.name} - Image ${index + 1}`}
								width={1200}
								height={800}
								style={{ width: '100%', height: 'auto' }}
								priority={index === 0}
							/>
						</div>
					))}
				</main>

				<footer className="project-footer">
					<div className="footer-content">
						<div className="project-title-footer">
							<h1>{project.name}</h1>
							<p>{project.location}</p>
						</div>

						<button 
							className="about-project-btn"
							onClick={() => setIsAboutProjectOpen(true)}
						>
							ABOUT THIS PROJECT
						</button>
					</div>
				</footer>

				{isAboutProjectOpen && (
					<div className="about-project-modal-overlay">
						<div className="about-project-modal">
							<button 
								className="close-button"
								onClick={() => setIsAboutProjectOpen(false)}
								aria-label="Close"
							>
								×
							</button>

							<div className="about-project-content">
								<h2 className="modal-title">{project.name}</h2>
								<p className="modal-location">{project.location}</p>

								<div className="modal-description">
									<p>{project.description}</p>
									<p>{project.description}</p>
								</div>

								<div className="modal-details">
									<div className="detail-item">
										<span className="detail-label">Year</span>
										<span className="detail-value">2023</span>
									</div>
									<div className="detail-item">
										<span className="detail-label">Area</span>
										<span className="detail-value">450 m²</span>
									</div>
									<div className="detail-item">
										<span className="detail-label">Type</span>
										<span className="detail-value">Residential</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<style jsx>{`
					.project-page {
						min-height: 100vh;
						background: #f5f5f5;
						font-family: 'Archivo', sans-serif;
					}

					.project-header {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						height: 80px;
						background: white;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 2rem;
						z-index: 50;
						box-shadow: 0 2px 10px rgba(0,0,0,0.05);
					}

					.logo {
						font-size: 1.2rem;
						font-weight: 500;
						letter-spacing: 1px;
						color: #000;
						text-decoration: none;
						transition: opacity 0.3s ease;
					}

					.logo:hover {
						opacity: 0.6;
					}

					.header-nav {
						display: flex;
						gap: 2rem;
					}

					.nav-link {
						color: #000;
						text-decoration: none;
						font-size: 0.9rem;
						letter-spacing: 1px;
						transition: opacity 0.3s ease;
					}

					.nav-link:hover {
						opacity: 0.6;
					}

					.close-project {
						background: none;
						border: none;
						font-size: 2.5rem;
						color: #000;
						cursor: pointer;
						line-height: 1;
						padding: 0;
						width: 40px;
						height: 40px;
						display: flex;
						align-items: center;
						justify-content: center;
						transition: opacity 0.3s ease;
					}

					.close-project:hover {
						opacity: 0.6;
					}

					.project-gallery {
						margin-top: 80px;
						padding: 3rem 0;
						max-width: 1400px;
						margin-left: auto;
						margin-right: auto;
					}

					.gallery-item {
						margin-bottom: 2rem;
						padding: 0 2rem;
					}

					.gallery-item img {
						display: block;
					}

					.project-footer {
						background: white;
						padding: 2rem;
						box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
					}

					.footer-content {
						max-width: 1400px;
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.project-title-footer h1 {
						font-size: 1.5rem;
						font-weight: 600;
						margin: 0 0 0.5rem 0;
						color: #000;
					}

					.project-title-footer p {
						font-size: 0.9rem;
						color: #666;
						margin: 0;
						text-transform: uppercase;
						letter-spacing: 1px;
					}

					.about-project-btn {
						background: #000;
						color: white;
						border: none;
						padding: 1rem 2rem;
						font-size: 0.9rem;
						font-weight: 500;
						letter-spacing: 1px;
						cursor: pointer;
						transition: background 0.3s ease;
						font-family: 'Archivo', sans-serif;
					}

					.about-project-btn:hover {
						background: #333;
					}

					.about-project-modal-overlay {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background: rgba(0, 0, 0, 0.7);
						z-index: 100;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 2rem;
					}

					.about-project-modal {
						background: white;
						max-width: 600px;
						width: 100%;
						max-height: 80vh;
						overflow-y: auto;
						position: relative;
						border-radius: 8px;
						animation: modalFadeIn 0.3s ease-out;
					}

					@keyframes modalFadeIn {
						from {
							opacity: 0;
							transform: scale(0.9);
						}
						to {
							opacity: 1;
							transform: scale(1);
						}
					}

					.close-button {
						position: absolute;
						top: 1.5rem;
						right: 1.5rem;
						background: none;
						border: none;
						font-size: 2rem;
						color: #333;
						cursor: pointer;
						line-height: 1;
						padding: 0;
						width: 35px;
						height: 35px;
						display: flex;
						align-items: center;
						justify-content: center;
						transition: opacity 0.3s ease;
					}

					.close-button:hover {
						opacity: 0.6;
					}

					.about-project-content {
						padding: 3rem;
					}

					.modal-title {
						font-size: 1.8rem;
						font-weight: 600;
						margin: 0 0 0.5rem 0;
						color: #000;
					}

					.modal-location {
						font-size: 0.95rem;
						color: #666;
						margin: 0 0 2rem 0;
						text-transform: uppercase;
						letter-spacing: 1px;
					}

					.modal-description {
						margin-bottom: 2.5rem;
					}

					.modal-description p {
						font-size: 1rem;
						line-height: 1.7;
						color: #666;
						margin-bottom: 1.5rem;
					}

					.modal-details {
						border-top: 1px solid #e0e0e0;
						padding-top: 2rem;
					}

					.detail-item {
						display: flex;
						justify-content: space-between;
						padding: 0.8rem 0;
						border-bottom: 1px solid #f0f0f0;
					}

					.detail-label {
						font-size: 0.9rem;
						color: #999;
						font-weight: 400;
					}

					.detail-value {
						font-size: 0.95rem;
						color: #333;
						font-weight: 500;
					}

					@media (max-width: 768px) {
						.project-header {
							padding: 0 1rem;
							height: 70px;
						}

						.logo {
							font-size: 1rem;
						}

						.header-nav {
							gap: 1rem;
						}

						.nav-link {
							font-size: 0.8rem;
						}

						.project-gallery {
							margin-top: 70px;
							padding: 1.5rem 0;
						}

						.gallery-item {
							padding: 0 1rem;
							margin-bottom: 1.5rem;
						}

						.footer-content {
							flex-direction: column;
							gap: 1.5rem;
							align-items: flex-start;
						}

						.about-project-content {
							padding: 2rem 1.5rem;
						}

						.modal-title {
							font-size: 1.5rem;
						}
					}
				`}</style>
			</div>
		</>
	);
}

export async function getStaticPaths() {
	return {
		paths: [
			{ params: { slug: 'haus-g' } },
			{ params: { slug: 'haus-m' } }
		],
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	// Aqui você buscaria os dados do projeto de uma API
	return {
		props: {
			slug: params.slug
		}
	};
}