'use babel';

import NewfromtemplateView from './newfromtemplate-view';
import { CompositeDisposable } from 'atom';

export default {

  newfromtemplateView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.newfromtemplateView = new NewfromtemplateView(state.newfromtemplateViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.newfromtemplateView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'newfromtemplate:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.newfromtemplateView.destroy();
  },

  serialize() {
    return {
      newfromtemplateViewState: this.newfromtemplateView.serialize()
    };
  },

  toggle() {
    console.log('Newfromtemplate was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
