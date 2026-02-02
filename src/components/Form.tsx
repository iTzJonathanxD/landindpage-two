import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Store, MapPin, Clock, CheckCircle, CalendarDays, Calendar, Clock as ClockIcon, Wifi, ShieldCheck, ThumbsUp, Users } from "lucide-react";
import { type CarouselApi } from "@/components/ui/carousel"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";


// Esquema de validación con Zod
const formSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un email válido").optional().or(z.literal("")),
  mobilePhone: z.string().min(8, "El teléfono debe tener al menos 8 dígitos"),
  businessName: z.string().optional(),
  town: z.string().min(2, "Ingresa una ciudad válida"),
  callTime: z.string().min(1, "Selecciona un horario"),
  isBusiness: z.boolean().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export default function Contacto() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobilePhone: "",
      businessName: "",
      town: "",
      callTime: "",
      isBusiness: false,
      message: "",
    },
  });

  const callTimes = [
    "Mañana (9:00 - 12:00)",
    "Tarde (12:00 - 17:00)",
    "Noche (17:00 - 20:00)",
    "Indiferente",
  ];

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Aquí iría la lógica para enviar el formulario
  };

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  useEffect(() => {
  if (!api) return;

  const interval = setInterval(() => {
    api.scrollNext();
  }, 3000); 

  return () => clearInterval(interval);
}, [api]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-100">

      <section id="contacto" className="max-w-[90rem] mx-auto px-4 py-20 flex-1 relative">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-16 -left-16 w-72 h-72 bg-green rounded-full opacity-30 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-green rounded-full opacity-20 blur-2xl"></div>
        </div>
        <div className="relative z-10">
          <Badge className="mb-8 text-lg md:text-xl px-8 py-3 bg-green text-white rounded-full shadow font-semibold tracking-wide" text="Contacto" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight drop-shadow-lg">
            ¡Hablemos! Ponte en contacto con Alpha
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-12 max-w-2xl">
            ¿Tienes dudas, comentarios o quieres cotizar un proyecto? Completa el formulario o utiliza nuestros datos de contacto. Nuestro equipo te responderá lo antes posible.
          </p>
          <div className="grid md:grid-cols-2 gap-10 mb-24 items-stretch">
  {/* Formulario de contacto lado izquierdo */}
  <Card className="shadow-xl bg-gradient-to-br from-white via-slate-50 to-slate-100 backdrop-blur-md rounded-2xl w-full border-0 border-t-4 border-green pt-6 pl-6 pr-6 flex flex-col gap-6 overflow-hidden relative min-h-[400px] md:min-h-[480px]">
    <CardContent className="flex flex-col flex-1 justify-between p-0 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 flex-1"
          noValidate
        >
<h2 className="text-2xl font-bold text-green flex items-center gap-2 ">
  <Mail className="w-6 h-6 text-green" />
  Escríbenos
</h2>

          {/* Primera fila de campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Nombre completo */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-slate-700 mb-2 block">Nombre completo *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu nombre"
                      {...field}
                      className="w-full rounded-lg px-4 py-3 border border-slate-200 focus:border-green focus:ring-2 focus:ring-green-100 transition"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-slate-700 mb-2 block">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Ingresa tu email"
                      {...field}
                      className="w-full rounded-lg px-4 py-3 border border-slate-200 focus:border-green focus:ring-2 focus:ring-green-100 transition"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Segunda fila de campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Teléfono */}
            <FormField
              control={form.control}
              name="mobilePhone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-slate-700 mb-2 block">Teléfono *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Ingresa tu teléfono"
                      {...field}
                      className="w-full rounded-lg px-4 py-3 border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Ciudad */}
            <FormField
              control={form.control}
              name="town"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-slate-700 mb-2 block">Ciudad *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu ciudad"
                      {...field}
                      className="w-full rounded-lg px-4 py-3 border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Checkbox empresa */}
          <FormField
            control={form.control}
            name="isBusiness"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="accent-green-500 w-5 h-5"
                  />
                  <FormLabel className="font-semibold text-slate-700 cursor-pointer">
                    ¿Eres empresa?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Nombre del negocio (condicional) - Ocupa todo el ancho */}
          {form.watch("isBusiness") && (
            <div className="w-full">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-slate-700 mb-2 block">Empresa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de tu empresa"
                        {...field}
                        className="w-full rounded-lg px-4 py-3 border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Horario de llamada - Ocupa todo el ancho */}
          <div className="w-full">
            <FormField
              control={form.control}
              name="callTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-slate-700 mb-2 block">Horario preferido *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-lg px-4 py-3 border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition h-auto">
                        <SelectValue placeholder="Selecciona un horario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {callTimes.map((time) => (
                        <SelectItem key={time} value={time} className="py-3">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Mensaje - Ocupa todo el ancho */}
          <div className="w-full">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-slate-700 mb-2 block">Mensaje *</FormLabel>
                  <FormControl>
                    <textarea
                      rows={5}
                      placeholder="Cuéntanos cómo podemos ayudarte"
                      {...field}
                      className="w-full rounded-lg px-4 py-3 border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Botón de enviar - Centrado y con buen espacio */}
          <div className="w-full mt-4">
            <Button
              type="submit"
              className="w-full md:w-auto mx-auto bg-green hover:bg-green-600 text-white font-bold px-8 py-4 rounded-lg transition text-lg shadow"
            >
              Enviar mensaje
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  </Card>
  {/* Card de razones lado derecho */}
  <Card className="shadow-xl bg-gradient-to-br from-white via-slate-50 to-slate-100 backdrop-blur-md rounded-2xl w-full max-w-3xl border-0 border-t-4 border-green pt-6 pl-6 pr-6 flex flex-col gap-6 overflow-hidden relative min-h-[400px] md:min-h-[480px]">
    <CardContent className="flex flex-col items-center justify-center w-full p-0 h-full">
      <h3 className="text-2xl font-extrabold text-green mb-3 flex items-center justify-start w-full text-left">
        <Users className="w-6 h-6 text-green mr-3" />
        Razones para contactarnos 
      </h3>
      <p className="text-base md:text-lg leading-relaxed text-black font-normal mr-1 w-full text-left">
        Contáctanos y descubre por qué cada vez más personas en Adjuntas nos eligen por nuestra calidad, cercanía y experiencia.
      </p>
      {/* Carrusel de beneficios centrado */}
      <div className="w-full flex justify-center mt-6 relative">
        <div className="w-full max-w-xl">
          <Carousel setApi={setApi} className="w-full">
            
            <CarouselContent>
              <CarouselItem>
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[220px] h-full">
                  <CheckCircle className="w-12 h-12 text-green" />
                  <p className="text-slate-800 font-medium">Somos la empresa de internet número 1 en Adjuntas.</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[220px] h-full">
                  <ClockIcon className="w-12 h-12 text-green" />
                  <p className="text-slate-800 font-medium">Nuestro servicio es el más resistente, incluso en días de lluvia.</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[220px] h-full">
                  <Calendar className="w-12 h-12 text-green" />
                  <p className="text-slate-800 font-medium">Soporte local inmediato y más de 10 años conectando hogares y negocios.</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[220px] h-full">
                  <Wifi className="w-12 h-12 text-green" />
                  <p className="text-slate-800 font-medium">Conexión estable y rápida para toda la familia.</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[220px] h-full">
                  <ShieldCheck className="w-12 h-12 text-green" />
                  <p className="text-slate-800 font-medium">Red segura y soporte técnico confiable.</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[220px] h-full">
                  <ThumbsUp className="w-12 h-12 text-green" />
                  <p className="text-slate-800 font-medium">Clientes satisfechos nos recomiendan.</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[220px] h-full">
                  <Users className="w-12 h-12 text-green" />
                  <p className="text-slate-800 font-medium">Atención personalizada y cercana.</p>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${current === index + 1 ? 'bg-green' : 'bg-slate-300'}`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Personaje centrado */}
      <div className="flex justify-center items-end w-full z-10 h-full relative mt-10">
        <img
          src="/card-right.png"
          alt="Contacto"
          className="block h-full max-h-[320px] md:max-h-[420px] w-auto object-contain opacity-90 transition-all duration-300 mx-auto"
        />
        {/* Difuminado inferior */}
        <div className="absolute left-0 bottom-0 w-full h-8 md:h-12 pointer-events-none bg-gradient-to-t from-white/70 to-transparent z-20"></div>
      </div>
      <div className="h-64 w-80 rounded-full bg-green/15 blur-xl absolute -z-10 right-0 bottom-0 md:right-auto md:left-0"></div>
    </CardContent>
  </Card>
</div>

          {/* Secciones comerciales nuevas */}





        </div>
      </section>

    </div>
  );
}
