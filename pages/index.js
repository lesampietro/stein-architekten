import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
	const [currentProject, setCurrentProject] = useState(0);
	const [isContactOpen, setIsContactOpen] = useState(false);
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	
	const projects = [
		{
			id: 1,
			name: "HAUS G",
			location: "GIESSEN, DEUTSCHLAND",
			image: "/images/haus-01/01.jpg",
			number: "1/4",
			slug: "haus-g"
		},
		{
			id: 2,
			name: "HAUS M",
			location: "MÜNCHEN, DEUTSCHLAND", 
			image: "/images/haus-02/house02-01.jpg",
			number: "2/4",
			slug: "haus-m"
		},
		{
			id: 3,
			name: "HAUS G",
			location: "GIESSEN, DEUTSCHLAND",
			image: "/images/haus-01/house01-02.jpg",
			number: "3/4",
			slug: "haus-g"
		},
		{
			id: 4,
			name: "HAUS M",
			location: "MÜNCHEN, DEUTSCHLAND", 
			image: "/images/haus-02/house02-01.jpg",
			number: "4/4",
			slug: "haus-m"
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentProject((prev) => (prev + 1) % projects.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [projects.length]);

	const goToProject = (index) => {
		setCurrentProject(index);
	};

	return (
		<>
			<Head>
				<title>Stein Architekten</title>
				<meta name="description" content="Stein Architekten - by Robert Stein" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600&display=swap" rel="stylesheet" />
			</Head>

			<div className="homepage">
				<header className="header">
					<h1 className="logo">STEIN ARCHITEKTEN</h1>
				</header>

				<nav className="contact-nav">
					<a 
						href="#contact" 
						className="nav-link"
						onClick={(e) => {
							e.preventDefault();
							setIsContactOpen(true);
						}}
					>
						CONTACT
					</a>
				</nav>
				
				<nav className="about-nav">
					<a 
						href="#about" 
						className="nav-link"
						onClick={(e) => {
							e.preventDefault();
							setIsAboutOpen(true);
						}}
					>
						ABOUT
					</a>	
				</nav>

				<main className="main-content">
					<div className="image-container">
						<Image
							src={projects[currentProject].image}
							alt={projects[currentProject].name}
							fill
							priority
							className="background-image"
							style={{ objectFit: 'cover' }}
						/>
						
						<div className="overlay" />
					</div>

					<div className="project-info">
						<span className="project-number">
							{projects[currentProject].number}
						</span>
						<Link href={`/projects/${projects[currentProject].slug}`}>
							<h2 className="project-title">
								{projects[currentProject].name}
							</h2>
						</Link>
						<span className="project-location">
							{projects[currentProject].location}
						</span>
					</div>

					<div className="indicators">
						{projects.map((_, index) => (
							<button
								key={index}
								className={`indicator ${index === currentProject ? 'active' : ''}`}
								onClick={() => goToProject(index)}
								aria-label={`See project ${index + 1}`}
							/>
						))}
					</div>
				</main>

				{isContactOpen && (
					<div className="contact-modal-overlay">
						<div className="contact-modal">
							<button 
								className="close-button"
								onClick={() => setIsContactOpen(false)}
								aria-label="Close contact form"
							>
								×
							</button>

							<div className="contact-content">
								<p className="contact-intro">
									Morbi maximus sit amet turpis at facilisis.<br />
									In et urna lorem: <a href="mailto:stein.architekten@outlook.com" className="email-link">stein.architekten@outlook.com</a>
								</p>

								<p className="contact-subtitle">
									Morbi maximus sit amet turpis at facilisis:
								</p>

								<form className="contact-form">
									<div className="form-group">
										<label htmlFor="firstName">
											First Name <span className="required">*required</span>
										</label>
										<input 
											type="text" 
											id="firstName" 
											name="firstName"
											required 
										/>
									</div>

									<div className="form-group">
										<label htmlFor="lastName">
											Last Name <span className="required">*required</span>
										</label>
										<input 
											type="text" 
											id="lastName" 
											name="lastName"
											required 
										/>
									</div>

									<div className="form-group">
										<label htmlFor="email">
											E-mail Address <span className="required">*required</span>
										</label>
										<input 
											type="email" 
											id="email" 
											name="email"
											required 
										/>
									</div>

									<div className="form-group">
										<label htmlFor="phone">
											Phone Number
										</label>
										<input 
											type="tel" 
											id="phone" 
											name="phone"
										/>
									</div>

									<div className="form-group">
										<label htmlFor="inquiry">
											What can I help you with? <span className="required">*required</span>
										</label>
										<select 
											id="inquiry" 
											name="inquiry"
											required
										>
											<option value="">Choose Inquiry</option>
											<option value="project">New Project</option>
											<option value="consultation">Consultation</option>
											<option value="other">Other</option>
										</select>
									</div>

									<div className="form-group">
										<label htmlFor="message">
											Message
										</label>
										<textarea 
											id="message" 
											name="message"
											rows="5"
										></textarea>
									</div>

									<button type="submit" className="submit-button">
										SEND
									</button>
								</form>
							</div>
						</div>
					</div>
				)}

				{isAboutOpen && (
					<div className="about-modal-overlay">
						<div className="about-modal">
							<button 
								className="close-button-left"
								onClick={() => setIsAboutOpen(false)}
								aria-label="Close About modal"
							>
								×
							</button>
							<div className="about-content">
								<div className="about-image">
									<Image
										src="/images/robert-stein.png"
										alt="Robert Stein"
										width={200}
										height={200}
										style={{ objectFit: 'cover'}}
									/>
								</div>
								<div className="about-info">
									<p className="about-company">STEIN ARCHITEKTEN</p>
									<h3 className="about-name">Robert Stein</h3>
									<p className="about-address">
										Cronstettenstr. 34<br/>
										603022 Frankfurt am Main
									</p>
								</div>
								<p className="about-description">
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								</p>
								<p className="about-email">
									<a href="mailto:info@steinarchitekten.de">
										info@steinarchitekten.de
									</a>
								</p>
							</div>
						</div>
					</div>
				)}

				<style jsx>{`
					.homepage {
						height: 100vh;
						position: relative;
						overflow: hidden;
						font-family: 'Archivo', sans-serif;
						color: white;
						display: grid;
						grid-template-columns: 1fr 1fr 1fr 1fr;
					}

					.header {
						position: absolute;
						top: 2rem;
						left: 2rem;
						z-index: 10;
					}

					.logo {
						font-size: 1.5rem;
						font-weight: 400;
						letter-spacing: 1px;
						margin: 0;
						color: white;
					}

					.contact-nav {
						position: absolute;
						top: 50%;
						left: 2rem;
						transform: translateY(-50%);
						z-index: 15;
					}

					.about-nav {
						position: absolute;
						top: 50%;
						right: 2rem;
						transform: translateY(-50%);
						z-index: 15;
					}

					.nav-link {
						color: white;
						text-decoration: none;
						font-size: 0.9rem;
						font-weight: 400;
						letter-spacing: 1px;
						transition: opacity 0.3s ease;
						cursor: pointer;
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
						padding-left: 50%;
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
						background: rgba(0, 0, 0, 0.4);
						z-index: 2;
					}

					.project-info {
						position: relative;
						z-index: 8;
						text-align: left;
						padding-left: 2rem;
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

					.contact-modal-overlay {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 100;
						display: flex;
						justify-content: flex-end;
					}

					.contact-modal {
						width: 50%;
						height: 100vh;
						background: white;
						overflow-y: auto;
						animation: slideInRight 0.3s ease-out;
					}

					@keyframes slideInRight {
						from {	
							transform: translateX(100%);
						} 
						to {
							transform: translateX(0);
						}
					}

					.about-modal-overlay {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 100;
						display: flex;
						justify-content: flex-start;
					}

					.about-modal {
							width: 50%;
							height: 100vh;
							background: white;
							overflow-y: auto;
							animation: slideInLeft 0.3s ease-out;
						}

					@keyframes slideInLeft {
						from {
							transform: translateX(-100%);
						}
						to {
							transform: translateX(0);
						}
					}

					.close-button {
						position: absolute;
						top: 2rem;
						right: 2rem;
						background: none;
						border: none;
						font-size: 2.5rem;
						color: #333;
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

					.close-button-left {
						position: absolute;
						top: 2rem;
						left: 2rem;
						background: none;
						border: none;
						font-size: 2.5rem;
						color: #333;
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
					
					.close-button:hover,
					.close-button-left:hover {
						opacity: 0.6;
					}
					
					.contact-content {
						padding: 4rem 3rem;
						color: #666;
					}

					.about-content {
						padding: 4rem 3rem;
						color: #666;
					}

					.about-image {
						margin-top: 2rem;
						margin-bottom: 2rem;
					}

					.about-image img {
						border-radius: 0;
					}

					.about-info {
						margin-bottom: 2.5rem;
					}

					.about-company {
						font-size: 0.85rem;
						color: #999;
						margin-bottom: 0.5rem;
						letter-spacing: 1px;
						font-weight: 400;
					}

					.about-name {
						font-size: 1.3rem;
						color: #000;
						margin: 0 0 1rem 0;
						font-weight: 600;
					}

					.about-address {
						font-size: 0.95rem;
						color: #666;
						line-height: 1.6;
						margin: 0;
					}

					.about-description {
						font-size: 0.95rem;
						line-height: 1.7;
						color: #999;
						margin-bottom: 1.5rem;
					}

					.about-email {
						margin-top: 2.5rem;
						padding: 0;
					}

					.about-email a {
						font-size: 1rem;
						color: #000;
						text-decoration: none;
						border-bottom: 1px solid #000;
						font-weight: 500;
					}

					.about-email a:hover {
						opacity: 0.6;
					}

					.contact-intro {
						font-size: 1rem;
						line-height: 1.6;
						margin-bottom: 2rem;
						color: #888;
					}

					.email-link {
						color: #333;
						text-decoration: none;
						border-bottom: 1px solid #333;
					}

					.email-link:hover {
						opacity: 0.6;
					}

					.contact-subtitle {
						font-size: 1rem;
						color: #888;
						margin-bottom: 2rem;
					}

					.contact-form {
						display: flex;
						flex-direction: column;
						gap: 1.5rem;
					}

					.form-group {
						display: flex;
						flex-direction: column;
					}

					.form-group label {
						font-size: 0.9rem;
						margin-bottom: 0.5rem;
						color: #666;
						font-weight: 400;
					}

					.required {
						color: #e74c3c;
						font-size: 0.85rem;
					}

					.form-group input,
					.form-group select,
					.form-group textarea {
						padding: 0.8rem;
						border: 1px solid #ddd;
						border-radius: 4px;
						font-size: 0.95rem;
						font-family: 'Archivo', sans-serif;
						transition: border-color 0.3s ease;
					}

					.form-group input:focus,
					.form-group select:focus,
					.form-group textarea:focus {
						outline: none;
						border-color: #333;
					}

					.form-group textarea {
						resize: vertical;
						min-height: 120px;
					}

					.submit-button {
						background: #000;
						color: white;
						padding: 1rem 2.5rem;
						border: none;
						border-radius: 4px;
						font-size: 0.9rem;
						font-weight: 500;
						letter-spacing: 1px;
						cursor: pointer;
						transition: background 0.3s ease;
						align-self: flex-start;
						font-family: 'Archivo', sans-serif;
					}

					.submit-button:hover {
						background: #333;
					}

					@media (max-width: 768px) {
						.homepage {
							grid-template-columns: 1fr;
						}
						
						.header {
							top: 1rem;
							left: 1rem;
						}
						
						.logo {
							font-size: 1.5rem;
						}
						
						.contact-nav {
							bottom: 4rem;
							left: 1rem;
							top: auto;
							transform: none;
						}
						
						.about-nav {
							bottom: 4rem;
							right: 1rem;
							top: auto;
							transform: none;
						}

						.main-content {
							justify-content: flex-start;
							align-items: center;
							padding-left: 0;
						}
						
						.project-info {
							padding-left: 1rem;
							max-width: calc(100% - 2rem);
							text-align: left;
						}
						
						.project-title {
							font-size: 1.8rem;
						}

						.contact-modal {
							width: 100%;
						}

						.about-modal {
							width: 100%;
						}

						.contact-content {
							padding: 5rem 1.5rem 2rem;
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

export async function getStaticProps() {
	return {
		props: {},
		revalidate: 60,
	};
}