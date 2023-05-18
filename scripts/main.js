import OnStartUp from './on_startup.js';
import ProjectSwitvher from './projects_switcher.js';
import photoesSwtitcher from './photoes_switcher.js';

let startup = new OnStartUp();
let projects_switcher = new ProjectSwitvher();
let photoes_switcher = new photoesSwtitcher();

startup.updateAboutInfoText();
startup.viewCharacteristics();

projects_switcher.changeProjectMonitor();

photoes_switcher.changePhotoes();
