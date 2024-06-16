import contextFactory from "../Context Factory";
import type { FileSystemStateType } from "./types";
import useFileSystemState from "./useFileSystemState";

const { Provider, useContext } =
  contextFactory<FileSystemStateType>(useFileSystemState);

export { Provider as FileSystemProvider, useContext as useFileSystem };
