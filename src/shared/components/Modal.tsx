import { ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence, TargetAndTransition, VariantLabels } from 'framer-motion';
import CloseImg from '@/assets/close.svg';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    position?: 'center' | 'bottom' | 'top';
    width?: string;
    height?: string;
    className?: string;
    showOverlay?: boolean;
    closeOnClickOutside?: boolean;
    title: string;
    footer?: ReactNode;
    animation?: {
        initial?: TargetAndTransition | VariantLabels;
        animate?: TargetAndTransition | VariantLabels;
        exit?: TargetAndTransition | VariantLabels;
        transition?: any;
    };
}

const defaultAnimations = {
    center: {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
        transition: { type: "spring", damping: 15, stiffness: 150 }
    },
    bottom: {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
        transition: { type: "spring", damping: 15, stiffness: 150 }
    },
    top: {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "-100%", opacity: 0 },
        transition: { type: "spring", damping: 15, stiffness: 150 }
    }
} as const;

export const Modal = ({
    isOpen,
    onClose,
    children,
    footer,
    title,
    position = 'center',
    width = 'auto',
    height = 'auto',
    className = '',
    showOverlay = true,
    closeOnClickOutside = true,
    animation
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (closeOnClickOutside &&
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, closeOnClickOutside]);

    const selectedAnimation = animation || defaultAnimations[position];

    const getPositionStyles = () => {
        switch (position) {
            case 'bottom':
                return 'items-end';
            case 'top':
                return 'items-start';
            default:
                return 'items-center';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {showOverlay && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black-opacity-50 z-40"
                        />
                    )}

                    <div className={`fixed inset-0 flex justify-center ${getPositionStyles()} z-50`}>
                        <motion.div
                            ref={modalRef}
                            style={{ width, height }}
                            className={`bg-white dark:bg-white rounded-lg shadow-lg ${className}`}
                            initial={selectedAnimation.initial}
                            animate={selectedAnimation.animate}
                            exit={selectedAnimation.exit}
                            transition={selectedAnimation.transition}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center border-b border-gray-300 px-[32px] py-[15px]">
                                    <h3 className="text-black-2 text-[16px]">{title}</h3>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:text-main transition-colors"
                                    >
                                        <img src={CloseImg} alt="Close modal" />
                                    </button>
                                </div>
                                <div className="max-h-[70vh] overflow-y-auto scrollbar-hide py-[16px]">
                                    {children}
                                </div>
                                <div className="flex justify-center p-[14px]">
                                    {footer}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};