import React from 'react'
import "./DeveloperCard.css"
import instaLogo from "../../../assets/instagram_white.png"
import linkedinLogo from "../../../assets/linkedin_white.png"
import githubLogo from "../../../assets/github_white.png"

const DeveloperCard = ({details}) => {
    const { name , image_url, contribution, email, insta, linkedin, github } = details;
  return (
    <div class="developer-card">
        <a href={`mailto:${email}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
        </a>
        <div class="developer-profile-pic">
            <img src={image_url} alt='pic' />
        </div>
        <div class="developer-bottom">
            <div class="developer-bottom-content">
                <span class="name">{name}</span>
                <span class="about-me">{contribution}</span>
            </div>
           <div class="developer-bottom-bottom">
            <div class="social-links-container">
                <a href={insta} target="_blank" rel="noreferrer"><img src={instaLogo} alt='insta' /></a>
                <a href={linkedin} target="_blank" rel="noreferrer"><img src={linkedinLogo} alt='linkedin' /></a>
                <a href={github} target="_blank" rel="noreferrer"><img src={githubLogo} alt='github' /></a>
                
            </div>
            <button><a href={`mailto:${email}`}>Contact</a></button>
           </div>
        </div>
    </div>
  )
}

export default DeveloperCard