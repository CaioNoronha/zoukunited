"use client";

import { useRef, type PointerEvent, type MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TicketCard from "@/components/common/ticket-card";
import { useTranslation } from "@/hooks/useTranslation";

const easeOut: [number, number, number, number] = [0.4, 0, 0.2, 1];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.8, ease: easeOut, delay: 0.15 },
  },
};

export default function TicketsSection() {
  const { t } = useTranslation();
  const dragStateRef = useRef({
    startX: 0,
    startY: 0,
    moved: false,
    lastDragAt: 0,
  });
  const tickets = [
    {
      price: t.event.tickets.items.followers.price,
      title: t.event.tickets.items.followers.title,
      availability: t.event.tickets.items.followers.availability,
      description: t.event.tickets.items.followers.description,
    },
    {
      price: t.event.tickets.items.leaders.price,
      title: t.event.tickets.items.leaders.title,
      availability: t.event.tickets.items.leaders.availability,
      description: t.event.tickets.items.leaders.description,
    },
    {
      price: t.event.tickets.items.buddy.price,
      title: t.event.tickets.items.buddy.title,
      availability: t.event.tickets.items.buddy.availability,
      description: t.event.tickets.items.buddy.description,
    },
    {
      price: t.event.tickets.items.jackJill.price,
      title: t.event.tickets.items.jackJill.title,
      availability: t.event.tickets.items.jackJill.availability,
      description: t.event.tickets.items.jackJill.description,
    },
    {
      price: t.event.tickets.items.preParty.price,
      title: t.event.tickets.items.preParty.title,
      availability: t.event.tickets.items.preParty.availability,
      description: t.event.tickets.items.preParty.description,
    },
  ];

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStateRef.current.startX = event.clientX;
    dragStateRef.current.startY = event.clientY;
    dragStateRef.current.moved = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const deltaX = Math.abs(event.clientX - dragStateRef.current.startX);
    const deltaY = Math.abs(event.clientY - dragStateRef.current.startY);
    if (deltaX > 6 || deltaY > 6) {
      dragStateRef.current.moved = true;
      dragStateRef.current.lastDragAt = Date.now();
    }
  };

  const handlePointerUp = () => {
    if (dragStateRef.current.moved) {
      dragStateRef.current.lastDragAt = Date.now();
      dragStateRef.current.moved = false;
    }
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (Date.now() - dragStateRef.current.lastDragAt < 250) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <section className="bg-neutral-950 px-6 py-14 lg:min-h-[620px]">
      <motion.div
        className="mx-auto w-full max-w-6xl space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div className="space-y-2" variants={itemVariants}>
          <p className="relative w-fit text-[20px] font-semibold uppercase leading-7 tracking-[-0.005em] text-[#FAFAFA]">
            {t.event.tickets.title}
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[2px] w-10 origin-left bg-[#F39200]"
              variants={lineVariants}
            />
          </p>
        </motion.div>
        <Carousel
          opts={{ align: "start", dragFree: true }}
          className="w-full"
        >
          <CarouselContent className="py-2">
            {tickets.map((ticket) => (
              <CarouselItem
                key={ticket.title}
                className="basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[33%]"
              >
                <motion.div
                  variants={itemVariants}
                  className="h-full"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onClickCapture={handleClickCapture}
                >
                  <TicketCard {...ticket} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden -left-12 top-1/2 size-9 -translate-y-1/2 rounded-full border border-[#F39200]/60 bg-black/40 text-[#F39200] hover:bg-[#F39200]/15 hover:text-[#F39200] sm:flex sm:-left-14" />
          <CarouselNext className="hidden -right-12 top-1/2 size-9 -translate-y-1/2 rounded-full border border-[#F39200]/60 bg-black/40 text-[#F39200] hover:bg-[#F39200]/15 hover:text-[#F39200] sm:flex sm:-right-14" />
        </Carousel>
      </motion.div>
    </section>
  );
}
