import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TenderDetailsProps = {
  tender: any;
  loading: boolean;
  onClose: () => void;
};

const TenderDetails = ({ tender, loading, onClose }: TenderDetailsProps) => {
  const [expandSuppliers, setExpandSuppliers] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✖
          </button>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
          ) : tender ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {tender.title || "No Title"}
              </h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {tender.category || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Tender Date:</span>{" "}
                  {tender.date || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Deadline Date:</span>{" "}
                  {tender.deadline_date || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Purchaser:</span>{" "}
                  {tender.purchaser?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Contract Type:</span>{" "}
                  {tender.type?.name || "N/A"}
                </p>

                {tender.src_url && (
                  <p>
                    <a
                      href={tender.src_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Source
                    </a>
                  </p>
                )}
              </div>

              {/* Suppliers section */}
              <div className="border-t pt-4 mt-4">
                <button
                  onClick={() => setExpandSuppliers(!expandSuppliers)}
                  className="text-blue-600 font-semibold mb-2"
                >
                  {expandSuppliers
                    ? "Hide Awarded Suppliers ▲"
                    : "Show Awarded Suppliers ▼"}
                </button>

                {expandSuppliers && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-2 mt-2"
                  >
                    {tender.awarded && tender.awarded.length > 0 ? (
                      tender.awarded.map((supplier: any, index: number) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-md shadow-sm"
                        >
                          <p className="font-semibold text-gray-800">
                            {supplier.suppliers_name || "Unknown Supplier"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Award Date: {supplier.date || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Value:{" "}
                            {supplier.value
                              ? `€${Number(supplier.value).toLocaleString()}`
                              : "N/A"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No suppliers awarded yet.</p>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 text-gray-600">
              No details found for this tender.
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TenderDetails;
