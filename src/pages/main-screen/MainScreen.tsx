import { useSearchParams } from 'react-router-dom';
import { CitiesCardList } from '../../components/cards/cities-card-list/CitiesCardList';
import { Header } from '../../components/header/Header';
import { LocationRows } from '../../components/locations-row/LocationsRow';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { getOffers } from '../../store/offers-process/selectors';
import { changeCityName } from '../../store/offers-process/offers-process';
import { cityNames } from '../../const';
import { Page404NotFound } from '../page-404-not-found/Page404NotFound';

export function MainScreen() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, _] = useSearchParams();

  const offers = useAppSelector(getOffers);

  const cityNameFromQuery = search.get('city');
  if (cityNameFromQuery !== null) {
    if (!cityNames.includes(cityNameFromQuery)) {
      return <Page404NotFound />;
    }
    dispatch(changeCityName(cityNameFromQuery));
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index${offers.length === 0 && ' page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationRows/>
        </div>
        <CitiesCardList/>
      </main>
    </div>
  );
}
