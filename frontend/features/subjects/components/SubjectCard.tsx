"use client";

import { useAuthStore } from "@/store/authStore";
import { Subject } from "@/types/student.types";
import { GraduationCap, Paperclip, Presentation } from "lucide-react";
import Link from "next/link";

const SubjectCard = ({ subject }: { subject: Subject }) => {
  const { user } = useAuthStore();
  const role = user?.role;

  return (
    <Link
      href={`/subjects/${subject._id}`}
      className={`border-2 border-border shadow-sm flex flex-col gap-3 capitalize p-3 rounded-2xl px-5 hover:border-primary/25 transition-all duration-300 hover:shadow-lg group`}
    >
      <h3 className={` text-lg font-medium `}>{subject.title}</h3>
      {role === "student" && (
        <div className={`flex items-center gap-2`}>
          <Presentation
            className={`size-4.5 group-hover:stroke-primary transition-colors duration-300`}
          />
          <span className={`text-secondary-foreground`}>
            Doctor: {subject.teacherId.userId?.name ?? "TBD"}
          </span>
        </div>
      )}

      {role === "teacher" && (
        <div className={`flex items-center gap-2`}>
          <GraduationCap
            className={`size-4.5 group-hover:stroke-primary transition-colors duration-300`}
          />
          <span className={`text-secondary-foreground`}>
            Level: {subject.gradeId?.name}
          </span>
        </div>
      )}
      <div className={`flex items-center gap-2`}>
        <Paperclip
          className={`size-4.5 group-hover:stroke-primary transition-colors duration-300`}
        />
        <span className={`text-secondary-foreground`}>
          Lectures: {subject.materials.length}
        </span>
      </div>
    </Link>
  );
};

export default SubjectCard;
