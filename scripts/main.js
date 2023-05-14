import OnStartUp from './on_startup.js';
import ProjectSwitvher from './projects_switcher.js';

let startup = new OnStartUp();
let projects_switcher = new ProjectSwitvher();

startup.updateAboutInfoText();
startup.viewCharacteristics();

projects_switcher.changeProjectMonitor();
