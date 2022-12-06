import { NavigationManager } from './navigationManager'

export const Stonly = {
   setup(navigation: any) {
     NavigationManager.setup(navigation);
   },
   setNavigation(navigationRef: any) {
     NavigationManager.setNavigation(navigationRef);
   }
}
