import clsx from 'clsx';
import styles from './PageResidenceAdd.module.css';
import FormResidenceAdd from '../../Containers/FormResidenceAdd';
import { useAuthorization } from '../../Facades/useAuthorization';

function PageResidenceAdd() {
	const { user } = useAuthorization();
  console.log(user, 'user')
	// if (user.role !== 'admin')
	// 	return <div>У вас нет доступа</div>;
	return (
		<div className={clsx(styles.root)}>
			<FormResidenceAdd />
		</div>
	);
}

export default PageResidenceAdd;
