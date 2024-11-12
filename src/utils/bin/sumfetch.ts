import config from '../../../config.json';

const sumfetch = async (args: string[]): Promise<string> => {

    return `
                                                                                                                       
           ▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄                  sumfetch
        ▄▓▓▀ ▄▓▓▀▓▓▓▀▓▓▄ ▀▀▓▓▄              -----------
      ▓▓▀  ▄▓▀   ▐▓▓  ▀▓▓    ▓▓▄             ABOUT
    ▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            ${config.name}
   ▓▓     ▓▓▓    ▐▓▓    ▐▓▓     ▓▓           <u><a href="${config.resume_url}" target="_blank">Resume</a></u>
▐▓▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▓       爵 <u><a href="${config.repo}" target="_blank">This Repo</a></u>
▐▓       J U G N U M I S A L       ▐▓       -----------
▐▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓        CONTACT 
   ▓▓      ▐▓▓    ▓▓    ▐▓▓     ▓▓           <u><a href="mailto:${config.email}" target="_blank">${config.email}</a></u>
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            <u><a href="https://github.com/${config.social.github}" target="_blank">GitHub</a></u>
      ▓▓▓   ▐▓▓   ▓▓   ▓▓▓   ▓▓▀             <u><a href="https://linkedin.com/in/${config.social.linkedin}" target="_blank">LinkedIn</a></u>
        ▀▓▓▄▄ ▀▓▓▄▓▓▄▓▓▓▄▄▓▓▀               -----------
            ▀▓▓▓▓▓▓▓▓▓▓▓▀▀                                                                                                                                                           
`;
};

export default sumfetch;