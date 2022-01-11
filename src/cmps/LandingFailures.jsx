import React from 'react';

export function LandingFailures({ failures }) {
  return failures.length ? (
    failures.map((failure) => {
      return (
        <div className="failures flex column auto-center" key={failure.time + Math.random()}>
          <h1 className="failures-title">Failures :</h1>
          <section className="failures-container flex column">
            <div>
              <span>Reason: </span>
              {failure.reason}
            </div>
            <div>
              <span>Time : </span>
              {failure.time}
            </div>
            {failure.altitude && (
              <div>
                <span>Altitude: </span>
                {failure.altitude}
              </div>
            )}
          </section>
        </div>
      );
    })
  ) : (
    <div></div>
  );
}
