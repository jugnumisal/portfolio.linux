import config from '../../../config.json';

const sumfetch = async (args: string[]): Promise<string> => {
  return `
                                                                                                                       
           ▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄                  sumfetch
        ▄▓▓▀  ▄▓▓▀▓▓▓▀▓▓▄  ▀▀▓▓▄              -----------
      ▓▓▀  ▄▓▀    ▐▓▓    ▀▓▓    ▓▓▄             ABOUT
    ▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            ${config.name}
   ▓▓     ▓▓▓    ▐▓▓    ▐▓▓     ▓▓             Resume: ${config.resume_url}
▐▓▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▓       爵 Certs : ${config.certs}
▐▓        J U G N U M I S A L          ▐▓       -----------
▐▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓        CONTACT
   ▓▓      ▐▓▓    ▓▓    ▐▓▓     ▓▓               Email : ${config.email}
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓               GitHub: https://github.com/${config.social.github}
      ▓▓▓    ▐▓▓    ▓▓    ▓▓▓    ▓▓▀             LinkedIn: https://linkedin.com/in/${config.social.linkedin}

`;
};

export default sumfetch;
