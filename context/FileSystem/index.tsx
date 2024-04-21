import contextFactory from "../Context Factory";
import { initalFileSystemState } from "../Context Factory/initialContextStates";
import type { FileSystemStateType } from "./types";
import useFileSystemState from "./useFileSystemState";

const { Provider, useContext } = contextFactory<FileSystemStateType>(
  initalFileSystemState,
  useFileSystemState
);

export { Provider as FileSystemProvider, useContext as useFileSystem };
