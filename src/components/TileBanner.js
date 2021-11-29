import React from 'react';
import styled from 'styled-components';
import statNameAPI from '../tools/namingLibrary/statNames';
import moment from 'moment';

const BannerDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  padding: 1rem;
  min-height: 7rem;
  border-bottom: 3px solid #ddd;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  @media (max-width: 900px) {
    &.no-mobile {
      display: none;
    }
  }
`;

export const ToggleLayoutButton = styled.div`
  margin: auto;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s;
  background-color: rgba(44, 40, 55, 0.6);
  color: #eee;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  text-align: center;
  border: 1px solid #8a8a8a;
  border-radius: 5px;
  &:hover {
    background-color: #ddd;
    color: var(--betbro-blue);
    transition: 0.3s;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const Text = styled.span`
  margin: auto;
  font-size: 1rem;
`;

const OddsText = styled(Text)`
  padding-left: 1rem;
  @media (max-width: 500px) {
    padding: 0;
  }
`;

export const CenteredDiv = styled.div`
  margin: auto;
  text-align: center;
`;

const BannerSelector = styled.select`
  margin: auto;
  font-size: 1rem;
  background: var(--betbro-blue);
  color: #eee;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: calc(1rem + 3px);
  text-align: center;
  cursor: pointer;
`;

export default function TileBanner(props) {
  const {
    oddsSnapshotSite,
    setOddsSnapshotSite,
    siteLayout,
    toggleLayout,
    oddsLastUpdated,
  } = props.propsList;
  return (
    <BannerDiv>
      <Container>
        <label htmlFor="odds-selector" style={{ display: 'none' }}>
          Select book for odds data
        </label>
        <BannerSelector
          name="odds-selector"
          value={oddsSnapshotSite}
          onChange={(e) => {
            setOddsSnapshotSite(e.target.value);
          }}
        >
          {Object.values(statNameAPI.sites).map((site, i) => {
            return (
              <option key={i} value={Object.keys(statNameAPI.sites)[i]}>
                Book: {site}
              </option>
            );
          })}
        </BannerSelector>
      </Container>
      <Container className={'no-mobile'}>
        <CenteredDiv>
          <Text>Click to switch view mode:</Text>
        </CenteredDiv>
        <ToggleLayoutButton onClick={toggleLayout}>
          <Text>{siteLayout === 'grid' ? 'Tile mode' : 'Grid mode'}</Text>
        </ToggleLayoutButton>
      </Container>
      <Container>
        <CenteredDiv>
          <OddsText>Odds updated {moment(oddsLastUpdated).fromNow()}</OddsText>
        </CenteredDiv>
      </Container>
    </BannerDiv>
  );
}
