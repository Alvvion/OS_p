import contextFactory from "@/contexts/contextFactory";
import useFileSystemState from "@/contexts/fileSystem/useFileSystemState";
import { initalFileSystemState } from "@/contexts/intialContextStates";
import type { FileSystemStateType } from "@/types/hooks/FileSystemState";

const { Provider, useContext } = contextFactory<FileSystemStateType>(
  initalFileSystemState,
  useFileSystemState
);

export { Provider as FileSystemProvider, useContext as useFileSystem };
