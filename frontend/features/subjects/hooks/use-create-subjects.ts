import { createMutation } from "@/lib/create-mutation";
import { createSubject } from "../api/createSubject";

export const useCreateSubject = createMutation(createSubject, "subjects");
