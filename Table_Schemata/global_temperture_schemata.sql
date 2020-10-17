-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "emmission" (
    "country" VARCHAR   NOT NULL,
    "country_code" VARCHAR   NOT NULL,
    "year" DATE   NOT NULL,
    "annual_co2_emissions" FLOAT   NOT NULL,
    CONSTRAINT "pk_emmission" PRIMARY KEY (
        "year"
     )
);

CREATE TABLE "primary_energy" (
    "year" DATE   NOT NULL,
    "coal" FLOAT   NOT NULL,
    "oil" FLOAT   NOT NULL,
    "gas" FLOAT   NOT NULL,
    "hydropower" FLOAT   NOT NULL,
    "nuclear" FLOAT   NOT NULL,
    "solar" FLOAT   NOT NULL,
    "other_renewables" FLOAT   NOT NULL,
    "biomass" FLOAT   NOT NULL,
    "wind" FLOAT   NOT NULL,
    "biofuels" FLOAT   NOT NULL
);

CREATE TABLE "energy_consumption" (
    "country" VARCHAR   NOT NULL,
    "country_code" VARCHAR   NOT NULL,
    "year" DATE   NOT NULL,
    "biomass" FLOAT   NOT NULL,
    "hydro" FLOAT   NOT NULL,
    "solar" FLOAT   NOT NULL,
    "wind" FLOAT   NOT NULL,
    CONSTRAINT "pk_energy_consumption" PRIMARY KEY (
        "year"
     )
);

CREATE TABLE "global_tempertures" (
    "date" DATE   NOT NULL,
    "average_temperture" FLOAT   NOT NULL,
    "country" VARCHAR   NOT NULL,
    CONSTRAINT "pk_global_tempertures" PRIMARY KEY (
        "date"
     )
);

ALTER TABLE "emmission" ADD CONSTRAINT "fk_emmission_country" FOREIGN KEY("country")
REFERENCES "global_tempertures" ("country");

ALTER TABLE "primary_energy" ADD CONSTRAINT "fk_primary_energy_year" FOREIGN KEY("year")
REFERENCES "energy_consumption" ("year");

ALTER TABLE "energy_consumption" ADD CONSTRAINT "fk_energy_consumption_country" FOREIGN KEY("country")
REFERENCES "global_tempertures" ("country");

