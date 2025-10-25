import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ProjectPage() {
	const router = useRouter();
	const { slug } = router.query;
	const [isAboutProjectOpen, setIsAboutProjectOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [slideDirection, setSlideDirection] = useState('right');

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

	const nextImage = () => {
		setSlideDirection('right');
		setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
	};

	const prevImage = () => {
		setSlideDirection('left');
		setCurrentImageIndex((prev) => 
			prev === 0 ? project.images.length - 1 : prev - 1);
	};

	const handleWheel = (e) => {
		if (e.deltaY > 0) {
			nextImage();
		} else if (e.deltaY < 0) {
			prevImage();
		}
	};

	return (
		<>
			<Head>
				<title>{project.name} - Stein Architekten</title>
				<meta name="description" content={`${project.name} - ${project.location}`} />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600&display=swap" rel="stylesheet" />
			</Head>

			<div className="project-page" onWheel={handleWheel}>
				<header className="project-header">
					<h1 className="logo">
						<Link href="/" className="logo">
						STEIN ARCHITEKTEN
						</Link>
					</h1>

					<button 
						className="close-project"
						onClick={() => router.push('/')}
						aria-label="Close project"
					>
						×
					</button>
				</header>

				<main className="project-gallery">
					<button 
						className="gallery-nav gallery-nav-left"
						onClick={prevImage}
						aria-label="Previous image"
					/>
					<div className="gallery-container">
						<div className={`gallery-item slide-${slideDirection}`} key={currentImageIndex}>
							<Image
								src={project.images[currentImageIndex]}
								alt={`${project.name} - Image ${currentImageIndex + 1}`}
								width={1400}
								height={900}
								style={{ width: '100%', height: 'auto' }}
								priority
							/>
						</div>
						<div className="image-counter">
							{currentImageIndex + 1}/{project.images.length}
						</div>
					</div>
					<button 
						className="gallery-nav gallery-nav-right"
						onClick={nextImage}
						aria-label="Next image"
					/>
				</main>

				<footer className="project-footer">
					<div className="footer-content">
						<div className="project-title-footer">
							<h1>{project.name}</h1>
							<p>{project.location}</p>
						</div>

						<button 
							className="about-project-link"
							onClick={() => setIsAboutProjectOpen(true)}
						>
							ABOUT THIS PROJECT
						</button>
					</div>
				</footer>

				{isAboutProjectOpen && (
					<div className="about-project-modal-overlay">
						<div className='about-project-modal'>
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
								</div>

								<div className="modal-details">
									<div className="detail-item">
										<span className="detail-label">Jahr</span>
										<span className="detail-value">2023</span>
									</div>
									<div className="detail-item">
										<span className="detail-label">Fläche</span>
										<span className="detail-value">450 m²</span>
									</div>
									<div className="detail-item">
										<span className="detail-label">Typ</span>
										<span className="detail-value">Wohnung</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<style jsx>{`
					.project-page {
						position: relative;						
						background: white;
						font-family: 'Archivo', sans-serif;
						display: flex;
						flex-direction: column;
						justify-content: center;
						min-height: 100vh;
						overflow: hidden;
					}

					.project-header {
						position: absolute;
						top: 2rem;
						left: 2rem;
						right: 2rem;
						background: white;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0;
						z-index: 10;
					}
					
					.logo {
						font-size: 1.5rem;
						font-weight: 400;
						letter-spacing: 1px;
						margin: 0;
						color: black;
					}
					
					.logo:hover {
						opacity: 0.7;
					}

					.close-project {
						background: none;
						border: none;
						font-size: 2rem;
						color: #000;
						cursor: pointer;
						line-height: 0;
						padding: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						transition: opacity 0.3s ease;
					}

					.close-project:hover {
						opacity: 0.6;
					}

					.project-gallery {
						flex: 1;
						display: flex;
						margin-top: 80px;
						align-items: center;
						justify-content: center;
						position: relative;
						overflow: hidden;
						}
						
					.gallery-container {
						width: 100%;
						max-width: 1200px;
						padding: 0rem 2rem 0rem 2rem;
						position: relative;
					}
						
					.gallery-item {
						display: flex;
						justify-content: center;
						align-items: center;
					}
						
					.gallery-item img {
						display: flex;
						max-width: 100%;
						max-height: 100%;
						object-fit: cover;
					}

					.image-counter {
						position: relative;
						justify-content: center;
						text-align: center;
						margin-top: 1.5rem;
						font-size: 0.85rem;
						color: #555;
						padding: 0.2rem 0;
						letter-spacing: 1px;
						font-weight: 300;
						flex: 1;
						z-index: 5;
						display: flex;
						overflow: hidden;

					}
						
					@keyframes slideInRight {
						from {
							transform: translateX(100px);
						}
						to {
							transform: translateX(0);
						}
					}

					@keyframes slideInLeft {
						from {
							transform: translateX(-100px);
						}
						to {
							transform: translateX(0);
						}
					}

					.slide-right {
						animation: slideInRight 0.5s ease-out;
					}

					.slide-left {
						animation: slideInLeft 0.5s ease-out;
					}

					.gallery-nav {
						position: absolute;
						top: 0;
						bottom: 80px;
						width: 20%;
						background: transparent;
						border: none;
						z-index: 10;
						transition: background 0.3s ease;
					}

					.gallery-nav-left {
						left: 0;
						cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>') 16 16, auto;
					}

					.gallery-nav-right {
						right: 0;
						cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>') 16 16, auto;
					}
						
					.project-footer {
						position: relative;
						bottom: 20;
						left: 0;
						right: 0;
						background: white;
						padding: 1rem 2rem 1rem 2rem;
						z-index: 5;
						flex-shrink: 0;
					}

					.footer-content {
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.project-title-footer h1 {
						letter-spacing: 1px;
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

					.about-project-link {
						display: inline-flex;
						justify-content: center;
						padding: 0.5rem 0rem;
						font-size: 0.9rem;
						background-color: white;
						border: none;
						color: #000;
						font-weight: 400;
						cursor: pointer;
						transition: opacity 0.3s ease;
						font-family: 'Archivo', sans-serif;
						text-decoration: none;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						max-width: 100%;
					}

					.about-project-link:hover {
						opacity: 0.6;
					}
						
					.about-project-modal {
						width: 50%;
						height: 100vh;
						background: white;
						overflow-y: auto;
						animation: slideInRight 0.3s ease-out;
					}

					.about-project-modal-overlay {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 100;
						display: flex;
						justify-content: flex-end;
						background: rgba(0, 0, 0, 0.05);
					}

					.close-button {
						position: absolute;
						top: 2rem;
						right: 2rem;
						background: none;
						border: none;
						font-size: 2rem;
						color: #333;
						cursor: pointer;
						line-height: 1;
						padding: 0;
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
							padding: 0;
							top: 1rem;
							left: 1rem;
							right: 1rem;
						}

						.logo {
							font-size: 1.5rem;
						}

						.project-gallery {
							margin-top: 70px;
							height: calc(100vh - 180px);
						}

						.gallery-container {
							padding: 0 1rem;
						}

						.image-counter {
							margin-top: 1rem;
							font-size: 0.8rem;
						}

						.gallery-nav {
							width: 30%;
						}

						.footer-content {
							flex-direction: column;
							gap: 1.5rem;
							align-items: flex-start;
						}

						.about-project-modal {
							width: 100%;
						}

						.about-project-content {
							padding: 2rem 1.5rem;
						}

						.modal-title {
							font-size: 1.5rem;
						}

						.close-button {
							top: 1rem;
							right: 1rem;
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
	return {
		props: {
			slug: params.slug
		}
	};
}