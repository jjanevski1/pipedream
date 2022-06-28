import pcloud from "./pcloud.app.mjs";
import common from "../common/base.mjs";
import { overwrite } from "../../props.mjs";
import { propFolderId } from "../../props-custom-descriptions.mjs";

export default {
  ...common,
  key: "pcloud-copy-folder",
  name: "Copy Folder",
  description: "Copy a folder to the specified folder. [See the docs here](https://docs.pcloud.com/methods/folder/copyfolder.html)",
  version: "0.0.1",
  type: "action",
  props: {
    ...common.props,
    folderId: propFolderId(" to copy"),
    toFolderId: {
      propDefinition: [
        pcloud,
        "folderId",
      ],
      label: "Destination Folder ID",
      description: `Select a **Destination Folder** where the folder will be copied to.
        \\
        Alternatively, you can provide a custom *Folder ID*.`,
    },
    overwrite,
    copyContentOnly: {
      type: "boolean",
      label: "Copy Content Only?",
      description:
        "If true, only the contents of source folder will be copied, otherwise the folder itself is copied.",
      default: false,
      optional: true,
    },
  },
  methods: {
    ...common.methods,
    getSummary() {
      return "Copied folder successfully";
    },
    async requestMethod() {
      return this.pcloud.copyFolder(
        this.folderId,
        this.toFolderId,
        !this.overwrite,
        this.copyContentOnly,
      );
    },
  },
};
