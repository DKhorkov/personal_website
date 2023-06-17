import OnStartUp from './on_startup.js';
import ProjectSwitvher from './projects_switcher.js';
import photoesSwtitcher from './photoes_switcher.js';
import CallFormHandler from './call_form_handler.js';

let startup = new OnStartUp();
let projects_switcher = new ProjectSwitvher();
let photoes_switcher = new photoesSwtitcher();
let call_form_handler = new CallFormHandler();

startup.updateAboutInfoText();
startup.viewCharacteristics();

projects_switcher.changeProjectMonitor();

photoes_switcher.changePhotoes();
photoes_switcher.listenForPopups();
