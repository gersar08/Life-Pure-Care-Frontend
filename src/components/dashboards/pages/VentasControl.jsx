import React, { Component } from "react";

export default class VentasControl extends Component {zzz
  render() {
    return (
      <div>
        <section class=" py-1 bg-blueGray-50">
          <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div class="rounded-t bg-white mb-0 px-6 py-6">
                <div class="text-center flex justify-between">
                  <h6 class="text-blueGray-700 text-xl font-bold">
                    Control de Ventas
                  </h6>
                  <button
                    class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-3  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Generar Factura
                  </button>
                </div>
              </div>
              <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Informacion del cliente
                  </h6>
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-6/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          N° de referencia
                        </label>
                        <input
                          type="text"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value=""
                          placeholder="0500505F"
                        />
                      </div>
                    </div>
                    <div class="w-full lg:w-6/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          Nombre del cliente
                        </label>
                        <input
                          type="name"
                          class="border-0 px-3 py-3 opacity-50 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value="Juan Perez" //cambiar por props
                          disabled
                        />
                      </div>
                    </div>
                    <div class="w-full lg:w-6/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          N° de telefono
                        </label>
                        <input
                          type="integer"
                          class="border-0 px-3 py-3 opacity-50 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value="7777-7777" //cambiar por props
                          disabled
                        />
                      </div>
                    </div>
                    <div class="w-full lg:w-6/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          Documento de identidad
                        </label>
                        <input
                          type="integer"
                          class="border-0 opacity-50 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value="06359912-1" //cambiar por props
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <hr class="mt-6 border-b-1 border-blueGray-300" />

                  <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Informacion de productos de entrada
                  </h6>
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12 px-4"></div>
                    <div class="w-full lg:w-4/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          Garrafones
                        </label>
                        <input
                          type="integer"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value="0"
                        />
                      </div>
                    </div>
                    <div class="w-full lg:w-4/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          Fardos
                        </label>
                        <input
                          type="integer"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value="0"
                        />
                      </div>
                    </div>
                    <div class="w-full lg:w-4/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          Pet
                        </label>
                        <input
                          type="integer"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value="0"
                        />
                      </div>
                    </div>
                  </div>

                  <hr class="mt-6 border-b-1 border-blueGray-300" />

                  <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Informacion de productos salida
                  </h6>
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12 px-4"></div>
                    <div class="w-full lg:w-4/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          Garrafones
                        </label>
                        <input
                          type="integer"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value="0"
                        />
                      </div>
                    </div>
                    <div class="w-full lg:w-4/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          Fardos
                        </label>
                        <input
                          type="integer"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value="0"
                        />
                      </div>
                    </div>
                    <div class="w-full lg:w-4/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          Pet
                        </label>
                        <input
                          type="integer"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value="0"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div class="flex justify-end">
                  <button
                    class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-3 mt-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Actualizar datos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
