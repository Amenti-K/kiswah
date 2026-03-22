"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useFetchTeams,
  useCreateTeam,
  useUpdateTeam,
  useDeleteTeam,
} from "@/apis/company.api";
import { ITeam } from "@/components/interface/company.interface";
import TeamForm from "@/components/forms/Team.form";
import { TeamType } from "@/components/schema/team.schema";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function AdminTeamSection() {
  const { data: teamsData, isPending: isFetching } = useFetchTeams();
  const { mutate: createTeam, isPending: isCreating } = useCreateTeam();
  const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam();
  const { mutate: deleteTeam, isPending: isDeleting } = useDeleteTeam();

  const [isOpen, setIsOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<ITeam | undefined>(undefined);

  const teams: ITeam[] = teamsData?.data || [];

  const handleSubmit = (values: TeamType) => {
    if (editingTeam?.id) {
      updateTeam(
        { ...values, id: editingTeam.id },
        {
          onSuccess: () => {
            setIsOpen(false);
            setEditingTeam(undefined);
          },
        },
      );
    } else {
      createTeam(values, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    }
  };

  const handleEdit = (team: ITeam) => {
    setEditingTeam(team);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this team? All staff members in it will be removed!",
      )
    ) {
      deleteTeam(id);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md p-6 rounded-3xl border border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Teams</h2>
            <p className="text-sm text-muted-foreground">
              Define departments and operational groups
            </p>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-xl px-6"
              onClick={() => {
                setEditingTeam(undefined);
                setIsOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Team
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingTeam ? "Edit Team" : "Add New Team"}
              </DialogTitle>
            </DialogHeader>
            <TeamForm
              defaultValues={editingTeam}
              onSubmit={handleSubmit}
              isPending={isCreating || isUpdating}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 rounded-3xl bg-card/50 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : teams.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-primary/10 rounded-3xl text-muted-foreground bg-card/20 backdrop-blur-sm">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg">No teams created yet.</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teams.map((team) => (
            <motion.div variants={item} key={team.id}>
              <Card className="glass-card hover:border-primary/40 transition-all duration-300 group overflow-hidden">
                <CardContent className="px-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                        {team.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                          {team.staffs?.length || 0} Members
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Order: {team.order}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/20 hover:text-primary"
                        onClick={() => handleEdit(team)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/20 hover:text-destructive"
                        onClick={() => handleDelete(team.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
