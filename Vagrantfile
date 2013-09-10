# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "precise64"

  config.vm.network :forwarded_port, host: 8082, guest: 8082
  config.vm.network :forwarded_port, host: 27017, guest: 27017

  config.vm.provision :puppet
end
