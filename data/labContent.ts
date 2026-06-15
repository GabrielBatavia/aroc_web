import communicationContent from "@/data/lab-content/communication.json";
import imageProcessingContent from "@/data/lab-content/image-processing.json";
import maneuveringContent from "@/data/lab-content/maneuvering.json";
import { labDivisions, type LabDivision, type LabModule } from "@/data/lab";

type LabContentFile = {
  divisionId: LabDivision["id"];
  modules: LabModule[];
};

const contentFiles = [
  maneuveringContent,
  imageProcessingContent,
  communicationContent,
] as LabContentFile[];

export const labDivisionsWithContent: LabDivision[] = labDivisions.map((division) => {
  const content = contentFiles.find((file) => file.divisionId === division.id);

  if (!content?.modules.length) return division;

  return {
    ...division,
    modules: content.modules,
  };
});
