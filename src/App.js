import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useState } from 'react'

const cartProducts = [
  {
    id: 1,
    title: 'Basic Tee',
    href: '#',
    cargo: '$10.00',
    color: 'Black',
    size: 'Large',
    imageSrc: '/product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    amount: 1,
    birim: 32,
    delete: false,
  },
  {
    id: 2,
    title: 'Basic Tee',
    href: '#',
    cargo: '$5.00',
    color: 'Sienna',
    size: 'Large',
    imageSrc: '/product-02.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
    amount: 2,
    birim: 16,
    delete: false,
  },
]

export default function OrderSummary() {
  const [item, setItem] = useState(cartProducts)

  const deleteItem = (id) => {
    const answ = confirm('Bu ürünü kaldırmak istediğinizden emin misiniz?')
    if (answ) {
      setTimeout(() => {
        const list = item.filter((item) => item.id != id)
        setItem(list)
      }, 3000)
    }
  }

  const addCount = (id) => {
    const list = item.map((data) => {
      if (data.id == id) {
        return { ...data, amount: data.amount + 1 }
      }
      return data
    })
    console.log(list)
    setItem(list)
  }

  const minusCount = (id) => {
    const list = item.map((data) => {
      if (data.id == id) {
        return { ...data, amount: data.amount - 1 }
      }
      return data
    })
    setItem(list)
  }

  const handleClick = () => {
    console.log(item)
  }

  return (
    <div className="max-w-sm py-8 mx-auto md:flex flex-col">
      <h2 className="text-lg font-medium text-gray-900">Sipariş özeti</h2>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <h3 className="sr-only">Alışveriş sepetinizdeki ürünler</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {item.map((product) => (
            <li key={product.id} className="flex px-4 py-6 sm:px-6">
              <div className="flex-shrink-0">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-20 rounded-md"
                  width={500}
                  height={500}
                />
              </div>

              <div className="ml-6 flex flex-1 flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      <a
                        href={product.href}
                        className="font-medium text-gray-700 hover:text-gray-800"
                      >
                        {product.title}
                      </a>
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                  </div>
                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      onClick={() => {
                        const list = item.map((item) => {
                          if (item.id == product.id) {
                            return { ...item, delete: true }
                          }
                          return item
                        })
                        setItem(list)
                        deleteItem(product.id)
                      }}
                    >
                      <span className="sr-only">Kaldır</span>
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      onClick={() => addCount(product.id)}
                      disabled={product.amount == 10}
                    >
                      <span className="sr-only">Kaldır</span>
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="-m-2.5 flex items-center justify-center">
                      {product.amount}
                    </div>
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      onClick={() => minusCount(product.id)}
                      disabled={product.amount == 0}
                    >
                      <span className="sr-only">Kaldır</span>
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 items-end justify-between pt-2">
                  <p className="mt-1 text-sm font-medium text-gray-900                 hover:text-amber-200">
                    ${product.birim * product.amount}
                  </p>
                </div>
                {product.delete && (
                  <div>
                    <span class="font-medium">.....Ürün Kaldırılıyor...</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        {item.length > 0 && (
          <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Ara Toplam</dt>
              <dd className="text-sm font-medium text-gray-900">
                $
                {item
                  .reduce((sum, item, index) => {
                    sum += item.amount * item.birim
                    return sum
                  }, 0)
                  .toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Kargo</dt>
              <dd className="text-sm font-medium text-gray-900">
                $
                {item
                  .reduce((sum, item, index) => {
                    if (item.amount > 0) {
                      sum += Number(item.cargo.split('$')[1])
                    }
                    return sum
                  }, 0)
                  .toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="font-extrabold text-xl text-amber-800">Toplam</dt>
              <dd className="text-base font-medium text-gray-900">
                $
                {item
                  .reduce((sum, item, index) => {
                    if (item.amount > 0) {
                      return (
                        sum +
                        Number(item.cargo.split('$')[1]) +
                        Number(item.amount * item.birim)
                      )
                    }
                    return sum
                  }, 0)
                  .toFixed(2)}
              </dd>
            </div>
          </dl>
        )}
        {item.length == 0 && <p className="text-center">Sepetiniz boş</p>}
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            onClick={handleClick}
          >
            Siparişi onaylayın
          </button>
        </div>
      </div>
    </div>
  )
}
