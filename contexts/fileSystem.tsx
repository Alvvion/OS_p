import useFileSystemState from "@/hooks/useFileSystemState";
import type { FileSystemStateType } from "@/types/hooks/FileSystemState";
import contextFactory from "@/utils/contextFactory";
import { initalFileSystemState } from "@/utils/intialContextStates";

const { context, Provider } = contextFactory<FileSystemStateType>(
  initalFileSystemState,
  useFileSystemState
);

export { context as FileSystemContext, Provider as FileSystemProvider };
