import contextFactory from "../Context Factory";
import FileInput from "./FileInput";
import type { FileSystemStateType } from "./types";
import useFileSystemState from "./useFileSystemState";

const { Provider, useContext } = contextFactory<FileSystemStateType>(
  useFileSystemState,
  () => <FileInput />,
);

export { Provider as FileSystemProvider, useContext as useFileSystem };
