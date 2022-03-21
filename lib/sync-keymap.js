"use babel";
import { CompositeDisposable } from "event-kit";
import path from 'path'

const saveKeyMap = (_data) => {
  const fsLibrary = require("fs");
  fsLibrary.writeFile(
    path.join(inkdrop.keymaps.configDirPath, 'keymap.cson'),
    _data,
    (error) => {
      // In case of a error throw err exception.
      if (error) {
        inkdrop.notifications.addError("KeyMap failed to save", {
          detail: "An error have befallen the plugin",
          dismissable: true,
        });
      } else {
        inkdrop.notifications.addInfo("KeyMap Saved", {
          detail: "It should how have taken effect!",
          dismissable: true,
        });
      }
    }
  );
};

module.exports = {
  config: {
    noteName: {
      title: "Note Name",
      type: "string",
      default: "KeyMap",
      description: "This is the name the note must have",
    },
  },
  activate() {
    const subscriptions = new CompositeDisposable();
    subscriptions.add(
      inkdrop.commands.add(document.body, {
        "core:save-note": () => {
          const { editingNote } = inkdrop.store.getState();
          if (editingNote.title == inkdrop.config.get("sync-keymap.noteName")) {
            let data;
            data = editingNote.body;
            saveKeyMap(data);
          }
        },
      })
    );
  },

  deactivate() {},
};
