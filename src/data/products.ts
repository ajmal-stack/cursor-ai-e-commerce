export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation',
  },
  {
    id: 2,
    title: 'Smart Watch Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    category: 'Electronics',
    description: 'Advanced smartwatch with health monitoring features',
  },
  {
    id: 3,
    title: 'Casual Denim Jacket',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9',
    category: 'Fashion',
    description: 'Classic denim jacket for everyday wear',
  },
  {
    id: 4,
    title: 'Running Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Sports',
    description: 'Comfortable running shoes with advanced cushioning',
  },
  {
    id: 5,
    title: 'Leather Backpack',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    category: 'Accessories',
    description: 'Stylish and durable leather backpack',
  },
  {
    id: 6,
    title: 'Coffee Maker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6',
    category: 'Home',
    description: 'Automatic coffee maker with timer',
  },
  {
    id: 7,
    title: 'Gaming Mouse',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
    category: 'Electronics',
    description: 'High-precision gaming mouse with RGB lighting',
  },
  {
    id: 8,
    title: 'Yoga Mat',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9b3',
    category: 'Sports',
    description: 'Non-slip yoga mat with carrying strap',
  },
  {
    id: 9,
    title: 'Sunglasses',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    category: 'Accessories',
    description: 'Designer sunglasses with UV protection',
  },
  {
    id: 10,
    title: 'Plant Pot Set',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
    category: 'Home',
    description: 'Set of 3 ceramic plant pots with drainage',
  },
  {
    id: 11,
    title: 'Dress Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4',
    category: 'Fashion',
    description: 'Classic fit cotton dress shirt',
  },
  {
    id: 12,
    title: 'Wireless Charger',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1586816879360-4cc756be4791',
    category: 'Electronics',
    description: 'Fast wireless charging pad for smartphones',
  },
];
