import { CompanyInfoInterface } from "@/lib/types";
import React from "react";

const CompanyInfoRender = ({
  formData,
  companyInfo,
}: {
  formData: CompanyInfoInterface;
  companyInfo: CompanyInfoInterface | null;
}) => {
  return (
    <div className="space-y-6">
      {/* Logo */}
      {companyInfo?.logo && (
        <div>
          <h3 className="font-semibold mb-2">Logo</h3>
          <img src={companyInfo.logo} alt="Company Logo" className="h-16" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Company Name</h3>
          <p className="text-muted-foreground">{formData.name}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Tagline</h3>
          <p className="text-muted-foreground">{formData.tagline}</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground">{formData.description}</p>
      </div>

      {/* Vision, Mission, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Vision</h3>
          <p className="text-muted-foreground">{formData.vision}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Mission</h3>
          <p className="text-muted-foreground">{formData.mission}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Values</h3>
          <p className="text-muted-foreground">{formData.values}</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Address</h3>
        <p className="text-muted-foreground">{formData.address}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Email</h3>
          <p className="text-muted-foreground">{formData.contactEmail}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Phone</h3>
          <p className="text-muted-foreground">{formData.contactPhone}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Founded</h3>
          <p className="text-muted-foreground">{formData.founded}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Employees</h3>
          <p className="text-muted-foreground">{formData.employeeCount}</p>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="font-semibold mb-2">Social Links</h3>
        <div className="flex flex-wrap gap-4">
          {formData.socialLinks &&
            Object.entries(formData.socialLinks).map(([platform, url]) => (
              <div key={platform} className="flex flex-col">
                <span className="font-medium">{platform}</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {url}
                </a>
              </div>
            ))}
          {!formData.socialLinks ||
            (Object.keys(formData.socialLinks).length === 0 && (
              <span className="text-muted-foreground">
                No social links provided.
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoRender;
