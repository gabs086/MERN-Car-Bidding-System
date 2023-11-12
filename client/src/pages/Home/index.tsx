import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      Home
      <Link to='register'>Register</Link>
    </div>
  );
}
