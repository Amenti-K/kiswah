import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    detailedDescription: string;
  } | null;
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  if (!service) return null;

  const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Package;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--golden))] to-[hsl(var(--golden-dark))] flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl">{service.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h4 className="font-semibold text-lg mb-3 text-foreground">
              Detailed Overview
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-3 text-foreground">
              Key Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((feature, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="justify-start py-2 px-4"
                >
                  <span className="text-sm">{feature}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
