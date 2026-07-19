import { Subject } from "@/types/student.types";
import SubjectCard from "./SubjectCard";

const NotAdminSubjectsView = ({ subjects }: { subjects: Subject[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {subjects.map((subject) => (
        <SubjectCard subject={subject} key={subject._id} />
      ))}
    </div>
  );
};

export default NotAdminSubjectsView;
