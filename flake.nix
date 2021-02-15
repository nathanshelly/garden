{
  description = "a space for me to grow things on the web";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";

    utils = {
      url = "github:numtide/flake-utils";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, self, utils }:
    utils.lib.eachDefaultSystem (
      system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };
        in
          rec {
            # nix <command> . runs the default attribute corresponding to that
            # command
            # e.g. `nix run .` runs the `defaultApp`

            defaultApp = apps.garden;
            defaultPackage = packages.garden;

            # `nix run`
            apps.garden = utils.lib.mkApp {
              drv = packages.garden;
              # name = "garden";
            };

            # checks to be run either manually, in CI, or in pre-commit hooks
            #
            # TODO: understand how to define arbitrary checks here.
            # documentation does not seem to have much about this.
            #
            # - https://nixos.wiki/wiki/Flakes#Output_schema
            # - https://discourse.nixos.org/t/my-painpoints-with-flakes/9750/12
            checks = {
              # confirm our garden builds (same as `nix build .#garden`)
              build = self.packages.${system}.garden;
            };

            # `nix develop`
            devShell = pkgs.mkShell {
              nativeBuildInputs = with pkgs; [
                deno
                yarn
                yarn2nix
              ];
            };

            # `nix build`
            packages = {
              # version & name are parsed from Cargo.toml
              garden = pkgs.mkYarnPackage {
                name = "garden";
                src = ./.;
                packageJSON = ./package.json;
                yarnLock = ./yarn.lock;
              };

              docker = pkgs.dockerTools.streamLayeredImage {
                name = "garden";
                tag = "latest";

                config.Cmd = [ "${self.packages.x86_64-linux.garden}/bin/garden" ];
                config.Env = [ "PORT=7777" ];
              };
            };
          }
    );
}
