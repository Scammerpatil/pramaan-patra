"use client";
import { useAuth } from "@/context/AuthProvider";
import { Organisation } from "@/types/Organisation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageOrganisationPage = () => {
  const { user } = useAuth();
  const [newOrganisation, setNewOrganisation] = useState<Organisation>({
    name: "",
    organisationType: "",
    contact: {
      email: "",
      phone: "",
      address: "",
    },
    establishedOn: new Date(),
    website: "",
  });
  const [organisations, setOrganisations] = useState<Organisation[]>([]);

  const fetchOrganisations = async () => {
    if (!user?._id) return;
    const res = await axios.get(`/api/organisation?id=${user._id}`);
    setOrganisations(res.data.organisations);
  };

  useEffect(() => {
    fetchOrganisations();
  }, [user]);

  const handleAddOrganisation = async () => {
    try {
      const res = axios.post("/api/organisation/addNewOrganisation", {
        newOrganisation,
        owner: user?._id,
      });
      toast.promise(res, {
        loading: "Adding Organisation...",
        success: "Organisation Added Successfully",
        error: "Error adding Organisation",
      });
    } catch (error) {
      toast.error("Error adding Organisation");
      console.error("Error adding organisation:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold uppercase">
        Manage Organisation
      </h1>
      <div className="w-full px-6 py-4">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Organisation Type</th>
                <th>Contact</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Established On</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {organisations.length ? (
                organisations.map((organisation, index) => (
                  <tr key={organisation._id}>
                    <td>{index + 1}</td>
                    <td>{organisation.name}</td>
                    <td>{organisation.organisationType}</td>
                    <td>{organisation.contact.email}</td>
                    <td>{organisation.contact.phone}</td>
                    <td>{organisation.contact.address}</td>
                    <td>
                      {organisation.establishedOn
                        ? new Date(
                            organisation.establishedOn
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{organisation.website || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    No Organisations Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Organisation Section */}
      <div className="w-full px-6 py-4">
        <h1 className="text-3xl text-center font-semibold uppercase">
          Add New Organisation
        </h1>
        <div className="max-w-md mx-auto space-y-3 px-4 py-6 mt-3">
          <label className="form-control w-full mx-auto">
            <span className="label-text">Organisation Name</span>
            <input
              type="text"
              placeholder="Enter Organisation Name"
              value={newOrganisation.name}
              onChange={(e) =>
                setNewOrganisation({ ...newOrganisation, name: e.target.value })
              }
              className="input input-bordered input-primary w-full"
            />
          </label>

          <label className="form-control w-full mx-auto">
            <span className="label-text">Organisation Type</span>
            <select
              value={newOrganisation.organisationType}
              onChange={(e) =>
                setNewOrganisation({
                  ...newOrganisation,
                  organisationType: e.target.value,
                })
              }
              className="input input-bordered input-primary w-full"
            >
              <option value="">Select Organisation Type</option>
              <option value="NGO">NGO</option>
              <option value="Company">Company</option>
              <option value="Government">Government</option>
              <option value="Educational">Educational</option>
              <option value="Non-Profit">Non-Profit</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
              <option value="Trust">Trust</option>
              <option value="Society">Society</option>
              <option value="Foundation">Foundation</option>
              <option value="Bank">Bank</option>
              <option value="Institute">Institute</option>
              <option value="Hospital">Hospital</option>
              <option value="Others">Others</option>
            </select>
          </label>

          <label className="form-control w-full mx-auto">
            <span className="label-text">Email</span>
            <input
              type="email"
              placeholder="Enter Email"
              value={newOrganisation.contact.email}
              onChange={(e) =>
                setNewOrganisation({
                  ...newOrganisation,
                  contact: {
                    ...newOrganisation.contact,
                    email: e.target.value,
                  },
                })
              }
              className="input input-bordered input-primary w-full"
            />
          </label>

          <label className="form-control w-full mx-auto">
            <span className="label-text">Phone</span>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={newOrganisation.contact.phone}
              onChange={(e) =>
                setNewOrganisation({
                  ...newOrganisation,
                  contact: {
                    ...newOrganisation.contact,
                    phone: e.target.value,
                  },
                })
              }
              className="input input-bordered input-primary w-full"
            />
          </label>

          <label className="form-control w-full mx-auto">
            <span className="label-text">Address</span>
            <input
              type="text"
              placeholder="Enter Address"
              value={newOrganisation.contact.address}
              onChange={(e) =>
                setNewOrganisation({
                  ...newOrganisation,
                  contact: {
                    ...newOrganisation.contact,
                    address: e.target.value,
                  },
                })
              }
              className="input input-bordered input-primary w-full"
            />
          </label>

          <label className="form-control w-full mx-auto">
            <span className="label-text">Established On</span>
            <input
              type="date"
              value={newOrganisation.establishedOn}
              onChange={(e) =>
                setNewOrganisation({
                  ...newOrganisation,
                  establishedOn: e.target.value,
                })
              }
              className="input input-bordered input-primary w-full"
            />
          </label>

          <label className="form-control w-full mx-auto">
            <span className="label-text">Website</span>
            <input
              type="text"
              placeholder="Enter Website URL"
              value={newOrganisation.website}
              onChange={(e) =>
                setNewOrganisation({
                  ...newOrganisation,
                  website: e.target.value,
                })
              }
              className="input input-bordered input-primary w-full"
            />
          </label>

          <button
            className="btn btn-primary btn-outline w-full"
            onClick={handleAddOrganisation}
          >
            Add Organisation
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageOrganisationPage;
