import { useMemo, useState } from 'react'

const categories = ['All', 'Burgers', 'Pizza', 'Sushi', 'Indian', 'Healthy', 'Desserts']

const restaurants = [
  {
    id: 1,
    name: 'Urban Bites',
    cuisine: 'American • Burgers',
    rating: 4.8,
    time: '20-30 min',
    fee: '$2.99',
    promo: 'Free delivery',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Bella Pizza',
    cuisine: 'Italian • Pizza',
    rating: 4.9,
    time: '25-35 min',
    fee: '$3.49',
    promo: '50% off first order',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Sakura Sushi',
    cuisine: 'Japanese • Sushi',
    rating: 4.7,
    time: '18-28 min',
    fee: '$2.49',
    promo: 'Fresh daily',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Spice Route',
    cuisine: 'Indian • Curries',
    rating: 4.9,
    time: '22-32 min',
    fee: '$2.79',
    promo: 'Chef special',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
]

const menuItems = [
  {
    id: 101,
    name: 'Truffle Mushroom Burger',
    category: 'Burgers',
    price: 16.5,
    rating: 4.9,
    time: '15 min',
    desc: 'Beef patty, truffle aioli, caramelized onions.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 102,
    name: 'Pepperoni Supreme',
    category: 'Pizza',
    price: 19.0,
    rating: 4.8,
    time: '20 min',
    desc: 'Loaded with pepperoni, mozzarella and basil.',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 103,
    name: 'Salmon Crunch Roll',
    category: 'Sushi',
    price: 17.5,
    rating: 4.7,
    time: '12 min',
    desc: 'Crispy salmon, avocado, wasabi mayo and sesame.',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 104,
    name: 'Paneer Tikka Bowl',
    category: 'Indian',
    price: 14.0,
    rating: 4.9,
    time: '16 min',
    desc: 'Marinated paneer with saffron rice and veggies.',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 105,
    name: 'Green Goddess Salad',
    category: 'Healthy',
    price: 13.25,
    rating: 4.6,
    time: '10 min',
    desc: 'Organic greens, avocado, seeds and citrus dressing.',
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 106,
    name: 'Choco Lava Cake',
    category: 'Desserts',
    price: 8.5,
    rating: 5.0,
    time: '8 min',
    desc: 'Warm molten center with vanilla bean cream.',
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80',
  },
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([
    { id: 101, quantity: 1 },
    { id: 105, quantity: 2 },
  ])

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const addToCart = (itemId) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === itemId)

      if (existing) {
        return current.map((entry) =>
          entry.id === itemId ? { ...entry, quantity: entry.quantity + 1 } : entry,
        )
      }

      return [...current, { id: itemId, quantity: 1 }]
    })
  }

  const updateQuantity = (itemId, delta) => {
    setCart((current) =>
      current
        .map((entry) =>
          entry.id === itemId ? { ...entry, quantity: entry.quantity + delta } : entry,
        )
        .filter((entry) => entry.quantity > 0),
    )
  }

  const cartItems = cart.map((entry) => {
    const item = menuItems.find((menuItem) => menuItem.id === entry.id)
    return { ...item, quantity: entry.quantity }
  })

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const deliveryFee = subtotal > 0 ? 4.99 : 0
  const total = subtotal + deliveryFee

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">F</div>
          <div>
            <p className="eyebrow">Foodie</p>
            <h1>Freshly</h1>
          </div>
        </div>

        <nav className="top-links" aria-label="Main navigation">
          <a href="#">Delivery</a>
          <a href="#">Offers</a>
          <a href="#">Restaurants</a>
          <a href="#">Support</a>
        </nav>

        <button className="outline-btn">Login</button>
      </header>

      <main className="content">
        <section className="hero-card">
          <div className="hero-copy">
            <p className="tag">Fast delivery to your door</p>
            <h2>Craving something delicious?</h2>
            <p>
              Discover comfort food, healthy bowls, sushi, and dessert favorites in just a few taps.
            </p>
            <div className="hero-actions">
              <button className="primary-btn">Order now</button>
              <button className="ghost-btn">View menu</button>
            </div>
            <div className="stats-row">
              <div>
                <strong>2.4k+</strong>
                <span>Orders</span>
              </div>
              <div>
                <strong>4.8/5</strong>
                <span>Rating</span>
              </div>
              <div>
                <strong>15 min</strong>
                <span>Avg. delivery</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="promo-badge">Popular today</div>
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
              alt="Plated meal"
            />
          </div>
        </section>

        <section className="search-row">
          <label className="search-input" htmlFor="search">
            <span>Search</span>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search dishes or cuisines"
            />
          </label>
          <button className="filter-btn">Filters</button>
        </section>

        <section className="restaurants-section">
          <div className="section-heading">
            <h3>Nearby restaurants</h3>
            <a href="#">See all</a>
          </div>

          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <article key={restaurant.id} className="restaurant-card">
                <img src={restaurant.image} alt={restaurant.name} />
                <div className="restaurant-body">
                  <div className="restaurant-topline">
                    <h4>{restaurant.name}</h4>
                    <span className="rating">★ {restaurant.rating}</span>
                  </div>
                  <p>{restaurant.cuisine}</p>
                  <div className="restaurant-meta">
                    <span>{restaurant.time}</span>
                    <span>{restaurant.fee}</span>
                    <span className="promo-chip">{restaurant.promo}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="menu-section">
          <div className="section-heading">
            <h3>Popular dishes</h3>
            <div className="category-pills" aria-label="Categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={selectedCategory === category ? 'category-pill active' : 'category-pill'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="menu-layout">
            <div className="menu-grid">
              {filteredItems.length ? (
                filteredItems.map((item) => (
                  <article key={item.id} className="food-card">
                    <img src={item.image} alt={item.name} />
                    <div className="food-card-body">
                      <div className="food-header">
                        <div>
                          <h4>{item.name}</h4>
                          <span>{item.category}</span>
                        </div>
                        <span className="food-rating">★ {item.rating}</span>
                      </div>

                      <p>{item.desc}</p>

                      <div className="food-footer">
                        <strong>${item.price.toFixed(2)}</strong>
                        <span>{item.time}</span>
                        <button type="button" onClick={() => addToCart(item.id)}>
                          Add
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  <h4>No dishes found</h4>
                  <p>Try a different search term or category.</p>
                </div>
              )}
            </div>

            <aside className="cart-panel">
              <div className="cart-header">
                <h3>Your cart</h3>
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
              </div>

              {cartItems.length ? (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div>
                          <h4>{item.name}</h4>
                          <p>${item.price.toFixed(2)} each</p>
                        </div>

                        <div className="cart-qty">
                          <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="totals">
                    <div>
                      <span>Subtotal</span>
                      <strong>${subtotal.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span>Delivery</span>
                      <strong>${deliveryFee.toFixed(2)}</strong>
                    </div>
                    <div className="grand-total">
                      <span>Total</span>
                      <strong>${total.toFixed(2)}</strong>
                    </div>
                  </div>

                  <button className="checkout-btn" type="button">
                    Proceed to checkout
                  </button>
                </>
              ) : (
                <div className="cart-empty">
                  <p>Your cart is empty.</p>
                  <span>Add a few favorites to get started.</span>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
