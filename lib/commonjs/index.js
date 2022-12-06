"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stonly = void 0;
var _navigationManager = require("./navigationManager");
const Stonly = {
  setup(navigation) {
    _navigationManager.NavigationManager.setup(navigation);
  },
  setNavigation(navigationRef) {
    _navigationManager.NavigationManager.setNavigation(navigationRef);
  }
};
exports.Stonly = Stonly;
//# sourceMappingURL=index.js.map