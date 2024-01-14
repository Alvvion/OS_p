import useFileSystemState from "@/hooks/useFileSystemState";
import type { FileSystemStateType } from "@/types/hooks/FileSystemState";
import contextFactory from "@/utils/contextFactory";
import { initalFileSystemState } from "@/utils/intialContextStates";

const { Provider, useContext } = contextFactory<FileSystemStateType>(
  initalFileSystemState,
  useFileSystemState
);

export { Provider as FileSystemProvider, useContext as useFileSystem };
