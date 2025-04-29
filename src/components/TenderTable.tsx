import { useState, useEffect } from "react";
import { fetchTenders, fetchTenderDetails } from "../services/tenderAPI";
import TenderDetails from "./TenderDetails";

const TenderTable = () => {
  const [tenders, setTenders] = useState<any[]>([]);
  // const [selectedTenderId, setSelectedTenderId] = useState<number | null>(null);
  const [selectedTender, setSelectedTender] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTenders();
        setTenders(data);
      } catch (error) {
        console.error("Failed to fetch tenders:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleRowClick = async (id: number) => {
    // setSelectedTenderId(id);
    setModalOpen(true);
    setDetailsLoading(true);

    try {
      const tenderData = await fetchTenderDetails(id);
      setSelectedTender(tenderData);
    } catch (error) {
      console.error("Failed to fetch tender details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    // setSelectedTenderId(null);
    setSelectedTender(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📑 Tender Listings
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Suppliers</th>
              <th className="py-3 px-6 text-left">Contract Type</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {tenders.map((tender) => (
              <tr
                key={tender.id}
                className="border-b hover:bg-gray-100 cursor-pointer transition-all"
                onClick={() => handleRowClick(tender.id)}
              >
                <td className="py-3 px-6">{tender.title || "N/A"}</td>
                <td className="py-3 px-6">{tender.category || "N/A"}</td>
                <td className="py-3 px-6">
                  {tender.awarded?.[0]?.suppliers_name || "N/A"}
                </td>
                <td className="py-3 px-6">
                  {tender.type?.name ? (
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {tender.type.name}
                    </span>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <TenderDetails
          tender={selectedTender}
          loading={detailsLoading}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default TenderTable;
