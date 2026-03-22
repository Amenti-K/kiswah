"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, UserPlus, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useFetchTeams,
  useUpdateTeam,
  useCreateStaff,
  useUpdateStaff,
  useDeleteStaff,
} from "@/apis/company.api";
import { ITeam, IStaff } from "@/components/interface/company.interface";
import StaffForm from "@/components/forms/Staff.form";
import { StaffType } from "@/components/schema/team.schema";
import { Badge } from "@/components/ui/badge";
import { objectToFormData } from "@/lib/formDataHelper";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function AdminStaffSection() {
  const { data: teamsData, isPending: isFetching } = useFetchTeams();
  const { mutate: updateTeam, isPending: isUpdatingBulk } = useUpdateTeam();
  const { mutate: createStaff, isPending: isCreatingMember } = useCreateStaff();
  const { mutate: updateStaff, isPending: isUpdatingMember } = useUpdateStaff();
  const { mutate: deleteStaff, isPending: isDeletingMember } = useDeleteStaff();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [editingStaff, setEditingStaff] = useState<
    { staff: IStaff; teamId: string } | undefined
  >(undefined);

  const teams: ITeam[] = teamsData?.data || [];

  // Aggregate all staff from all teams
  const allStaff = teams.flatMap((team) =>
    team.staffs.map((staff) => ({
      ...staff,
      teamName: team.name,
      teamId: team.id,
    })),
  );

  const isPending = isUpdatingBulk || isCreatingMember || isUpdatingMember;

  const handleSubmit = (values: StaffType) => {
    const dataToSend = new FormData();
    // Use the helper to populate FormData
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof StaffType];
      // Skip undefined/null values
      if (value !== undefined && value !== null) {
        objectToFormData(dataToSend, key, value);
      }
    });
    dataToSend.append("teamId", selectedTeamId);
    if (editingStaff) {
      // Append ID for update
      dataToSend.append("id", editingStaff.staff.id);

      // Update existing staff member individually
      updateStaff(dataToSend, {
        onSuccess: () => {
          setIsOpen(false);
          setEditingStaff(undefined);
        },
      });
    } else {
      // Create new staff member individually
      createStaff(dataToSend, {
        onSuccess: () => {
          setIsOpen(false);
          setSelectedTeamId("");
        },
      });
    }
  };

  const handleEdit = (staff: IStaff, teamId: string) => {
    setEditingStaff({ staff, teamId });
    setIsOpen(true);
  };

  const handleDelete = (staffId: string) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      deleteStaff(staffId);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md p-6 rounded-3xl border border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Staff Members</h2>
            <p className="text-sm text-muted-foreground">
              Manage leadership and team participants
            </p>
          </div>
        </div>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setEditingStaff(undefined);
              setSelectedTeamId("");
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="rounded-xl px-6" disabled={teams.length === 0}>
              <Plus className="mr-2 h-4 w-4" /> Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingStaff ? "Edit Staff Member" : "Add Staff Member"}
              </DialogTitle>
            </DialogHeader>

            {!editingStaff && (
              <div className="space-y-3 mb-6">
                <label className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                  Select Target Team
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {teams.map((team) => (
                    <Button
                      key={team.id}
                      type="button"
                      variant={
                        selectedTeamId === team.id ? "default" : "outline"
                      }
                      className="justify-center truncate rounded-xl h-10 transition-all"
                      onClick={() => setSelectedTeamId(team.id)}
                    >
                      {team.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {editingStaff || selectedTeamId ? (
              <StaffForm
                defaultValues={editingStaff?.staff}
                onSubmit={handleSubmit}
                isPending={isPending}
              />
            ) : (
              <div className="text-center py-12 bg-primary/5 rounded-3xl border border-dashed border-primary/20">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">
                  Please select a team to continue.
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isFetching ? (
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-3xl bg-card/50 animate-pulse border border-white/5"
            />
          ))
        ) : allStaff.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-primary/10 rounded-3xl text-muted-foreground bg-card/20 backdrop-blur-sm">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">
              {teams.length === 0
                ? "Create a team first to add staff."
                : "No staff members added yet."}
            </p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 col-span-full"
          >
            {allStaff.map((staff) => (
              <motion.div variants={item} key={staff.id}>
                <div className="overflow-hidden group glass-card hover:border-primary/40 transition-all duration-300 rounded-3xl">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] relative bg-muted/20 overflow-hidden">
                      {staff.imageUrl ? (
                        <img
                          src={staff.imageUrl}
                          alt={staff.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Users className="h-16 w-16 opacity-20" />
                        </div>
                      )}

                      {/* Gradient Overlay for Text (Always visible or subtle) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      {/* Staff Info Layer (Always visible on the image) */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-end">
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-bold text-lg text-white truncate drop-shadow-md group-hover:text-primary transition-colors"
                        >
                          {staff.name}
                        </motion.h3>
                        <p className="text-xs text-white/80 font-medium truncate mb-3 drop-shadow-sm">
                          {staff.position}
                        </p>
                        <div className="flex gap-1.5 flex-wrap">
                          <Badge
                            variant="outline"
                            className="text-[9px] uppercase tracking-tighter font-black border-primary/40 bg-primary/20 text-primary rounded-md backdrop-blur-md"
                          >
                            {staff.teamName}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-[9px] font-medium bg-white/10 text-white rounded-md border-white/10 backdrop-blur-md"
                          >
                            #{staff.order}
                          </Badge>
                        </div>
                      </div>

                      {/* Action Buttons Layer (Centered on hover) */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-black/40 backdrop-blur-[2px]">
                        <div className="flex gap-4">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-2xl h-12 w-12 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white hover:text-black transition-all shadow-2xl"
                            onClick={() =>
                              handleEdit(staff as any, staff.teamId)
                            }
                          >
                            <Pencil className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-2xl h-12 w-12 bg-destructive/80 hover:bg-destructive transition-all shadow-2xl"
                            onClick={() => handleDelete(staff.id)}
                            disabled={isPending}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
