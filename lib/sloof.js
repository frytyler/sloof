'use babel';

import SloofView from './sloof-view';
import { CompositeDisposable } from 'atom';

export default {

  sloofView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    console.log(state);
    this.sloofView = new SloofView(state.sloofViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sloofView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sloof:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sloofView.destroy();
  },

  serialize() {
    return {
      sloofViewState: this.sloofView.serialize()
    };
  },

  toggle() {
    console.log('Sloof was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
