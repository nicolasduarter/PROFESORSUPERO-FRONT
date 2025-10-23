// src/components/ui/Modal.jsx
import { motion, AnimatePresence } from "framer-motion";

function Modal({ isOpen, onClose, title, children }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6 w-96"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                    >
                        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
                        {children}

                        <div className="mt-4 text-right">
                            <button
                                onClick={onClose}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Cerrar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Modal;
