// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + '\n';
    } else {
      c += Object.keys(bin).sort()[i - 1] + '\t';
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

export const certs = async (args: string[]): Promise<string> => {
  window.open(`${config.certs}`);
  return 'Redirecting to Certification credentials...';
};
// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. I'm a Systems Engineer, aka the person who makes sure everything works smoothly while pretending not to panic when it doesn’t. My daily routine involves taming servers, automating processes, and ensuring that systems stay up even when everything else feels like it's crashing. Whether it’s fixing things no one else can figure out or convincing software to behave, I’ve got it covered (with some well-placed Python scripts and bash magic).

When I'm not knee-deep in code or optimizing infrastructure, I enjoy explaining to friends and family that "no, I don’t fix printers." I thrive on solving complex problems, streamlining processes, and making sure no one ever has to ask, “Why is the system down?” (because it won’t be, if I’m around).

Outside of the tech world, I’m probably tinkering with something else—because let’s be honest, troubleshooting is a lifestyle.

More about me:
'sumfetch' - short summary.
'resume' - my latest Resume.
'linkedin' - my linkedin profile.
'github' - my github profile`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const pwd = async (args: string[]): Promise<string> => {
  return `/home/user/`;
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `vault_of_bad_ideas  
projects_that_worked  
one_day_i_ll_finish_this  
secrets_of_the_universe  
forbidden_forest  
room_of_requirements  
chamber_of_secrets  
marauders_map  
dumbledores_office    
potions_lab  
diagon_alley  
hogwarts_express  
quidditch_pitch`;
};

export const cd = async (args: string[]): Promise<string> => {
  if (args[0] === 'secrets_of_the_universe') {
    return `The answer is 42!`;
  }
  if (args.length === 0 || args[0] === '') {
    return `Already in /home. Try 'ls' or 'df' for a list of directories.`;
  }

  const dir = args[0].replace(/^\/+/, ''); 
  switch (dir) {
    case 'arc_reactor_lab':
      return `Access denied: You are not Tony Stark. Jarvis is watching.`;
    case 'assemble':
      return `
      Avengers, assemble! Wait... you're not on the team roster.  
      Please contact Nick Fury for recruitment.`;
    case 'snap_zone':
      return `
      You enter the snap zone... Half your files disappear. Hope you backed up your /soul.`;
    case 'vibranium_reserve':
      return `
      Welcome to Wakanda.  
      Accessing Vibranium reserves...  
      ERROR: Vibranium detected in your browser cache. Please return it before we call T'Challa.`;
    default:
      return `No such directory. Try 'ls' or 'df' for a list of directories.`;
  }
};

cd.getCompletions = (partial: string): string[] => {
  const directories = [
          'vault_of_bad_ideas',
          'projects_that_worked',
          'secrets_of_the_universe',
          'one_day_i_ll_finish_this',
          'forbidden_forest',
          'room_of_requirements',
          'chamber_of_secrets',
          'marauders_map',
          'dumbledores_office',
          'potions_lab',
          'diagon_alley',
          'hogwarts_express',
          'quidditch_pitch',
          'arc_reactor_lab',
          'assemble',
          'snap_zone',
          'vibranium_reserve',
        ];
  return directories.filter((dir) => dir.startsWith(partial));
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const hostname = async (args?: string[]): Promise<string> => {
  return `${config.ps1_hostname}`;
};

export const lscpu = async (args?: string[]): Promise<string> => {
  return `
Architecture:              StarkOS v2.0  
CPU(s):                    6 (Earth’s Mightiest Cores)  
Model name:                Arc Reactor MK-85 Processor  
Hyper-threading:           Enabled (Because I am *inevitable*)  
Clock Speed:               3,000 GHz (Fueled by Vibranium)  
Cache:                     16MB (Mostly witty comebacks)  
Vendor ID:                 Stark Industries  
Power Management:          Hulk SMASH Mode Available  
Thermal Throttling:        Cooled by Stormbreaker`;
};

export const df = async (args?: string[]): Promise<string> => {
  return `
Filesystem               Size    Used   Avail   Use%   Mounted on  
/home/stark_tower         42TB    41TB    1TB    98%    /arc_reactor_lab  
/home/avengers            10TB     9TB    1TB    90%    /assemble  
/home/infinity_stones     100GB   50GB   50GB    50%    /snap_zone  
/home/wakanda             Infinite  ∞     0      0%     /vibranium_reserve  
`;
};



export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility?🤨 `;
};

// Banner
export const banner = (args?: string[]): string => {
  return `
  
                 _____                                                                                         _____ 
                ( ___ )---------------------------------------------------------------------------------------( ___ )
                 |   |                                                                                         |   | 
                 |   |      ██╗██╗   ██╗ ██████╗ ███╗   ██╗██╗   ██╗    ███╗   ███╗██╗███████╗ █████╗ ██╗      |   | 
                 |   |      ██║██║   ██║██╔════╝ ████╗  ██║██║   ██║    ████╗ ████║██║██╔════╝██╔══██╗██║      |   | 
                 |   |      ██║██║   ██║██║  ███╗██╔██╗ ██║██║   ██║    ██╔████╔██║██║███████╗███████║██║      |   | 
                 |   | ██   ██║██║   ██║██║   ██║██║╚██╗██║██║   ██║    ██║╚██╔╝██║██║╚════██║██╔══██║██║      |   | 
                 |   | ╚█████╔╝╚██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝    ██║ ╚═╝ ██║██║███████║██║  ██║███████╗ |   | 
                 |   |  ╚════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝     ╚═╝     ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚══════╝ |   | 
                 |___|                                                                                         |___| 
                (_____)---------------------------------------------------------------------------------------(_____)


Hello, I’m ${config.name}, your friendly neighborhood Systems Engineer.
I specialize in turning tech headaches into smooth operations with a mix of automation and some strategic coding wizardry. My goal? To make sure your systems are running so well, you forget they're even there. Whether I’m wrangling servers or optimizing processes, I’m here to keep the digital gears turning—so you never have to wonder why things “just work.”

Oh, and if you’re just here to grab my resume but have no clue about Linux or terminals—don’t worry! Type 'resume', and you’ll be whisked right to it. Want more links or to connect? Just type 'sumfetch' and let's connect!
                                                                                       
Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
`;
};
